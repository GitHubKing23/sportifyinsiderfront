import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { fetchBlogsByCategory } from "@services/blogService";

interface Blog {
  _id: string;
  title: string;
}

const SportsCategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || typeof category !== "string") return;

    const loadBlogs = async () => {
      setLoading(true);
      try {
        console.log(`[Frontend] Fetching blogs for category: ${category}`);
        const data = await fetchBlogsByCategory(category);
        console.log(`[Frontend] Blogs received for ${category}:`, data);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch category blogs.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [category]);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All {category} Articles</h1>
      {blogs.length === 0 ? (
        <p>No articles found for {category}.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} className="mb-2">
              <Link href={`/blog/${blog._id}`}>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {blog.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SportsCategoryPage;
