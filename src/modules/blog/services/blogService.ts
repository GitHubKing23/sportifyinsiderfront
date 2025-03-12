import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000; // 10-second timeout

export const checkBackendHealth = async () => {
  try {
    const { data } = await axios.get("/health");
    console.log('✅ Backend Health:', data);
    return data;
  } catch (error: any) {
    console.error('❌ Backend Health Check Error:', error.message);
    return null;
  }
};

export const fetchAllBlogs = async () => {
  try {
    const { data } = await axios.get(`/blogs?nocache=${Date.now()}`);
    console.log('✅ Blogs fetched:', data);
    return data;
  } catch (err: any) {
    console.error('❌ Fetch Error:', err.message);
    throw err;
  }
};

export const fetchBlogsByCategory = async (category: string) => {
  try {
    const { data } = await axios.get(`/blogs/category/${category}?nocache=${Date.now()}`);
    console.log('✅ Blogs by Category:', data);
    return data;
  } catch (err: any) {
    console.error('❌ Fetch Category Error:', err.message);
    throw err;
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const { data } = await axios.get(`/blogs/${id}?nocache=${Date.now()}`);
    console.log('✅ Blog fetched by ID:', data);
    return data;
  } catch (err: any) {
    console.error('❌ Fetch Blog by ID Error:', err.message);
    throw err;
  }
};