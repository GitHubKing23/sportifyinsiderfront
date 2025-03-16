import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { fetchBlogById } from "@/modules/blog/services/blogService";

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const loadBlog = async () => {
      try {
        console.log(`🔄 Loading blog with ID: ${id}`);
        const data = await fetchBlogById(id);
        if (!data) {
          console.warn(`⚠️ No blog data found for ID: ${id}`);
          setError(`Blog with ID ${id} not found.`);
        } else {
          console.log(`✅ Blog loaded:`, data);
          setBlog(data);
        }
      } catch (err: any) {
        console.error(`❌ Error loading blog:`, err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) return <div>Loading blog...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      {blog.feature_image && (
        <img src={blog.feature_image} className="rounded-md mt-4" alt={blog.title || "Blog image"} />
      )}

      {/* ✅ Display Video */}
      {blog.video_url && (
        <div className="mt-4">
          <iframe 
            width="100%" 
            height="400" 
            src={blog.video_url.replace("watch?v=", "embed/")} 
            title="Blog Video" 
            allowFullScreen
          />
        </div>
      )}

      <article className="mt-4">
        {blog.sections?.map((section: any, index: number) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </article>
    </div>
  );
};

export default BlogDetail;
