import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_USER_API || "http://localhost:5002/api/users";

// 🔓 Public fetch (for comment display)
export const fetchUserProfile = async (address: string) => {
  const res = await axios.get(`${BASE_URL}/${address}`);
  return res.data;
};

// 🔒 Authenticated profile fetch (for /profile page)
export const getUserProfile = async (address: string, token: string) => {
  const res = await axios.get(`${BASE_URL}/${address}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🔒 Authenticated update
export const updateUserProfile = async (
  address: string,
  updates: Record<string, unknown>,
  token: string
) => {
  try {
    const res = await axios.put(`${BASE_URL}/update`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ API Error:", error.message);
    } else {
      console.error("❌ Unknown error during profile update:", error);
    }
    throw error;
  }
};
