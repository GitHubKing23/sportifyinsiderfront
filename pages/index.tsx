import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllBlogs } from "@services/blogService"; // ✅ Now uses alias
import { AxiosError } from "axios";
import Navbar from "@components/Navbar"; // ✅ Navbar import uses alias

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        console.log("🔍 Fetching all blogs...");
        const data = await fetchAllBlogs();
        console.log("✅ Blogs fetched successfully:", data);
        setBlogs(data);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 pt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Latest Blog Posts</h1>
        {loading && <div className="text-center">Loading blogs...</div>}
        {error && <div className="text-center text-red-600">Error: {error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition">
              {blog.feature_image && (
                <img src={blog.feature_image} alt={blog.title} className="rounded-md mb-4" />
              )}
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <Link href={`/blog/${blog._id}`} className="text-blue-600 hover:underline cursor-pointer mt-2 block">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
