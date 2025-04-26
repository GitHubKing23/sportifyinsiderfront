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

  const refreshUserProfile = useCallback(async () => {
    if (!token || !address) return;

    const userApiBase = process.env.NEXT_PUBLIC_USER_API || "http://localhost:5002";

    try {
      const res = await fetch(`${userApiBase}/api/users/${address}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const profile = await res.json();
      setUser(profile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("AuthContext error refreshing profile:", error.message);
      } else if (typeof error === "object" && error !== null) {
        console.error("AuthContext error refreshing profile:", JSON.stringify(error));
      } else {
        console.error("AuthContext error refreshing profile:", String(error));
      }
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

        const userApiBase = process.env.NEXT_PUBLIC_USER_API || "http://localhost:5002";

        await fetch(`${userApiBase}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ethereumAddress: address,
            username: address,
          }),
        });

        await refreshUserProfile();

        setTimeout(() => {
          if (
            user?.username === address &&
            !user?.bio &&
            !user?.avatarUrl
          ) {
            router.push("/profile");
          }
        }, 500);
      } else {
        setError("Login failed: No result returned");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("[AuthContext] MetaMask login failed:", err.message);
        setError(err.message || "Login failed");
      } else {
        console.error("[AuthContext] MetaMask login failed:", err);
        setError("Login failed");
      }
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

// ✅ Fix for: Module declares 'AuthContext' locally but it is not exported
export { AuthContext };
