// C:\Users\User\sportifyinsider-frontbeta\src\utils\api.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

// ✅ Debug: Confirm .env loading
console.log("📄 ENV VARS:", {
  NEXT_PUBLIC_AUTH_API: process.env.NEXT_PUBLIC_AUTH_API,
  NEXT_PUBLIC_COMMENT_API: process.env.NEXT_PUBLIC_COMMENT_API,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_WITH_CREDENTIALS: process.env.NEXT_PUBLIC_WITH_CREDENTIALS,
});

// ✅ Typed request interceptor
const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

// ✅ Axios instance creator
const createApi = (baseURL: string): AxiosInstance => {
  console.log("🛰️ Creating Axios instance with baseURL:", baseURL);
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 20000,
    withCredentials: process.env.NEXT_PUBLIC_WITH_CREDENTIALS === "true",
  });

  instance.interceptors.request.use(injectToken, (error) => {
    console.error("❌ Axios request error:", error);
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError | unknown) => {
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios response error:", {
          url: error?.config?.url,
          baseURL: error?.config?.baseURL,
          method: error?.config?.method,
          message: error?.message,
          code: error?.code,
          data: error?.response?.data,
        });
      } else {
        console.error("❌ Unknown error during Axios response:", error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// ✅ Use static or env-based URLs
const authBaseURL = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5003";
export const authApi = createApi(authBaseURL);

const commentBaseURL = process.env.NEXT_PUBLIC_COMMENT_API || "http://localhost:5004/api";
export const commentApi = createApi(commentBaseURL);

const defaultBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sportifyinsider.com/api";
const api = createApi(defaultBaseURL);

// 🔍 Output summary
console.log("📡 Auth API is using base URL:", authApi.defaults.baseURL);
console.log("📡 Comment API is using base URL:", commentApi.defaults.baseURL);
console.log("📡 Default API is using base URL:", api.defaults.baseURL);

export default api;
