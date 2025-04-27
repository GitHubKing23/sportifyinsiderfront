import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useEthereumLogin } from "@components/Auth/useEthereumLogin";

interface UserProfile {
  username?: string;
  ethereumAddress?: string;
  avatarUrl?: string;
  bio?: string;
}

interface AuthContextType {
  address: string | null;
  token: string | null;
  loginWithMetaMask: () => Promise<void>;
  logout: () => void;
  user: UserProfile | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  address: null,
  token: null,
  loginWithMetaMask: async () => {},
  logout: () => {},
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  refreshUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loginWithEthereum, error: loginError, loading } = useEthereumLogin();
  const router = useRouter();

  useEffect(() => {
    const storedAddress = localStorage.getItem("ethereum_address");
    const storedToken = localStorage.getItem("access_token");

    if (storedAddress && storedToken) {
      setAddress(storedAddress);
      setToken(storedToken);
      setUser({ ethereumAddress: storedAddress });
    }
  }, []);

  // ✅ Handle API Base URL Dynamically
  const getUserApiBase = () => {
    if (process.env.NODE_ENV === "development") {
      return "/proxy/users";
    }
    return process.env.NEXT_PUBLIC_USER_API?.replace(/\/$/, '') || "https://api.sportifyinsider.com/api/users";
  };

  const refreshUserProfile = useCallback(async () => {
    if (!token || !address) return;

    const userApiBase = getUserApiBase();
    const fetchUrl = `${userApiBase}/${address}`;

    console.log("🔗 Refreshing User Profile:", fetchUrl);
    console.log("🪪 Using Token:", token);

    try {
      const res = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.warn(`⚠️ Failed to fetch user profile. Status: ${res.status}`);
        return;
      }

      const profile = await res.json();
      setUser(profile);
    } catch (error: unknown) {
      console.error("❌ AuthContext error refreshing profile:", error);
    }
  }, [token, address]);

  useEffect(() => {
    if (token && address) {
      refreshUserProfile();
    }
  }, [token, address, refreshUserProfile]);

  const loginWithMetaMask = async () => {
    try {
      setError(null);
      const result = await loginWithEthereum();

      if (result) {
        const { address, token } = result;

        setAddress(address);
        setToken(token);
        localStorage.setItem("access_token", token);
        localStorage.setItem("ethereum_address", address);

        const userApiBase = getUserApiBase();

        // ✅ POST to /api/users (no address in URL)
        await fetch(userApiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ethereumAddress: address,
            username: address,
          }),
        });

        await refreshUserProfile();

        setTimeout(() => {
          if (user?.username === address && !user?.bio && !user?.avatarUrl) {
            router.push("/profile");
          }
        }, 500);
      } else {
        setError("Login failed: No result returned");
      }
    } catch (err: unknown) {
      console.error("[AuthContext] MetaMask login failed:", err);
      setError("Login failed");
      throw err;
    }
  };

  const logout = () => {
    setAddress(null);
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("ethereum_address");
  };

  return (
    <AuthContext.Provider
      value={{
        address,
        token,
        loginWithMetaMask,
        logout,
        user,
        accessToken: token,
        loading,
        error: error || loginError,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
