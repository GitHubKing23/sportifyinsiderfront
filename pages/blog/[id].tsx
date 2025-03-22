import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image"; // ✅ Placed before custom imports

import { fetchBlogById } from "@services/blogService"; // ✅ Fixed import order

interface Blog {
  _id: string;
  title: string;
  feature_image?: string;
  video_url?: string;
  sections?: { heading: string; content: string }[];
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
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
      } catch (err) {
        console.error(`❌ Error loading blog:`, err);
        setError("Failed to load blog.");
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

      {/* ✅ Optimized Image Handling */}
      {blog.feature_image && (
        <div className="relative w-full h-[400px] mt-4">
          <Image
            src={blog.feature_image}
            alt={blog.title}
            width={800} // ✅ Specify width
            height={400} // ✅ Specify height
            className="rounded-md"
          />
        </div>
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
        {blog.sections?.map((section, index) => (
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
