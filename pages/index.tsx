import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@modules/navbar/components/Navbar";
import { fetchAllBlogs } from "@services/blogService";

interface Blog {
  _id: string;
  title: string;
  feature_image?: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        console.log("🔍 Fetching all blogs...");
        const data: Blog[] = await fetchAllBlogs();
        console.log("✅ Blogs fetched successfully:", data);
        setBlogs(data);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
        setError("Failed to fetch blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <main className="container mx-auto p-6 pt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Latest Blog Posts</h1>

        {loading && <div className="text-center">Loading blogs...</div>}
        {error && <div className="text-center text-red-600">Error: {error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition"
            >
              {blog.feature_image && (
                <div className="relative w-full h-[200px] mb-3">
                  <Image
                    src={blog.feature_image}
                    alt={blog.title || "Blog image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <Link
                href={`/blog/${blog._id}`}
                className="text-blue-600 hover:underline cursor-pointer mt-2 block"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogList;
