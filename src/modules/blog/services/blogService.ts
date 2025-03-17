import axios from "axios";

// ✅ Load environment variables properly in Next.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
const WITH_CREDENTIALS = process.env.NEXT_PUBLIC_WITH_CREDENTIALS === "true";
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = WITH_CREDENTIALS;
axios.defaults.timeout = API_TIMEOUT;

// ✅ Type Definition for API Responses
interface Blog {
  _id: string;
  title: string;
  feature_image?: string;
  video_url?: string;
  sections?: { heading: string; content: string }[];
}

// ✅ Backend Health Check
export const checkBackendHealth = async (): Promise<{ status: string } | null> => {
  try {
    console.log("🔍 Checking backend health...");
    const { data } = await axios.get<{ status: string }>("/health");
    console.log("✅ Backend Health:", data);
    return data;
  } catch (error: unknown) {
    console.error("❌ Backend Health Check Error:", (error as Error).message);
    return null;
  }
};

// ✅ Fetch All Blogs
export const fetchAllBlogs = async (): Promise<Blog[]> => {
  try {
    console.log("🔍 Fetching all blogs...");
    const { data } = await axios.get<Blog[]>(`/blogs?nocache=${Date.now()}`);
    console.log("✅ Blogs fetched:", data);
    return data;
  } catch (error: unknown) {
    console.error("❌ Fetch All Blogs Error:", (error as Error).message);
    throw error;
  }
};

// ✅ Fetch Blogs by Category
export const fetchBlogsByCategory = async (category: string): Promise<Blog[]> => {
  try {
    console.log(`🔍 Fetching blogs for category: ${category}`);
    const { data } = await axios.get<Blog[]>(`/blogs/category/${category}?nocache=${Date.now()}`);
    console.log(`✅ Blogs fetched for category '${category}':`, data);
    return data;
  } catch (error: unknown) {
    console.error(`❌ Fetch Blogs by Category Error ('${category}')`, (error as Error).message);
    throw error;
  }
};

// ✅ Fetch Single Blog by ID
export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  try {
    console.log(`🔍 Fetching blog by ID: ${id}`);
    const { data } = await axios.get<Blog>(`/blogs/${id}?nocache=${Date.now()}`);
    console.log("✅ Blog fetched by ID:", data);
    return data;
  } catch (error: unknown) {
    console.error(`❌ Fetch Blog by ID Error ('${id}')`, (error as Error).message);
    return null;
  }
};
