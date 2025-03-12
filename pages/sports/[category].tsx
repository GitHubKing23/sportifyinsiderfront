import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchBlogsByCategory } from "../../src/modules/blog/services/blogService";

const SportsCategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  const [blogs, setBlogs] = useState<any>({ featured: [], others: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || typeof category !== "string") return;

    const loadBlogs = async () => {
      setLoading(true);
      try {
        console.log(`[Frontend] Fetching blogs for category: ${category}`);
        const data = await fetchBlogsByCategory(category as string);
        console.log(`[Frontend] Blogs received for ${category}:`, data);
        setBlogs(data);
      } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [category]);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  const allBlogs = [...blogs.featured, ...blogs.others];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All {category} Articles</h1>
      {allBlogs.length === 0 ? (
        <p>No articles found for {category}. Please check the backend data or category name.</p>
      ) : (
        <ul>
          {allBlogs.map((blog) => (
            <li key={blog._id} className="mb-2">
              <Link href={`/blog/${blog._id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SportsCategoryPage;