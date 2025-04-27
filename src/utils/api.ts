import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

// Detect environment
const isDev = process.env.NODE_ENV === "development";

// ✅ Confirm ENV variables
console.log("📄 ENV VARS:", {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_AUTH_API: process.env.NEXT_PUBLIC_AUTH_API,
  NEXT_PUBLIC_COMMENT_API: process.env.NEXT_PUBLIC_COMMENT_API,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
});

// Inject Bearer Token if available
const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

// Create Axios Instance
const createApi = (baseURL: string): AxiosInstance => {
  console.log("🛰️ Creating Axios instance with baseURL:", baseURL);

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
    withCredentials: false,   // Use false for token-based APIs
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
        console.error("❌ Unknown Axios error:", error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Base URLs
const authBaseURL = process.env.NEXT_PUBLIC_AUTH_API || (isDev ? "http://localhost:5003" : "https://api.sportifyinsider.com/auth");
export const authApi = createApi(authBaseURL);

const commentBaseURL = process.env.NEXT_PUBLIC_COMMENT_API || (isDev ? "http://localhost:5004/api/comments" : "https://api.sportifyinsider.com/api/comments");
export const commentApi = createApi(commentBaseURL);

const defaultBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || (isDev ? "http://localhost:5000/api" : "https://api.sportifyinsider.com/api");
const api = createApi(defaultBaseURL);

// Summary Logs
console.log("📡 Auth API Base:", authApi.defaults.baseURL);
console.log("📡 Comment API Base:", commentApi.defaults.baseURL);
console.log("📡 Default API Base:", api.defaults.baseURL);

export default api;
