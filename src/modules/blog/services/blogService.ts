import axios from "axios";

// ✅ Ensure the correct API base URL is set
axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000; // 10-second timeout

// ✅ Health Check API Call
export const checkBackendHealth = async () => {
  try {
    console.log("🔍 Checking backend health...");
    const { data } = await axios.get("/health");
    console.log("✅ Backend Health:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Backend Health Check Error:", error.message);
    return null;
  }
};

// ✅ Fetch All Blogs
export const fetchAllBlogs = async () => {
  try {
    console.log("🔍 Fetching all blogs...");
    const { data } = await axios.get(`/blogs?nocache=${Date.now()}`);
    console.log("✅ Blogs fetched:", data);
    return data;
  } catch (err: any) {
    console.error("❌ Fetch All Blogs Error:", err.message);
    throw err;
  }
};

// ✅ Fetch Blogs by Category
export const fetchBlogsByCategory = async (category: string) => {
  try {
    console.log(`🔍 Fetching blogs for category: ${category}`);
    const { data } = await axios.get(`/blogs/category/${category}?nocache=${Date.now()}`);
    console.log(`✅ Blogs fetched for category '${category}':`, data);
    return data;
  } catch (err: any) {
    console.error(`❌ Fetch Blogs by Category Error ('${category}')`, err.message);
    throw err;
  }
};

// ✅ Fetch Single Blog by ID
export const fetchBlogById = async (id: string) => {
  try {
    console.log(`🔍 Fetching blog by ID: ${id}`);
    const { data } = await axios.get(`/blogs/${id}?nocache=${Date.now()}`);
    console.log("✅ Blog fetched by ID:", data);
    return data;
  } catch (err: any) {
    console.error(`❌ Fetch Blog by ID Error ('${id}')`, err.message);
    throw err;
  }
};
