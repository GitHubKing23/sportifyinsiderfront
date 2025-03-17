import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchBlogById } from "@services/blogService"; // ✅ Corrected Import

// ✅ Define TypeScript types for Blog and Section
interface BlogSection {
  heading: string;
  content: string;
  image?: string;
}

interface Blog {
  title: string;
  feature_image?: string;
  video_url?: string;
  sections: BlogSection[];
}

const BlogDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const loadBlog = async () => {
      try {
        console.log(`🔄 Loading blog with ID: ${id}`);
        const data: Blog | null = await fetchBlogById(id);

        if (!data) {
          console.warn(`⚠️ No blog data found for ID: ${id}`);
          setError(`Blog with ID ${id} not found.`);
        } else {
          console.log(`✅ Blog loaded:`, data);
          setBlog(data);
        }
      } catch (err: unknown) {
        console.error(`❌ Error loading blog:`, err);
        setError("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) return <div className="text-center text-lg font-medium">Loading blog...</div>;
  if (error) return <div className="text-center text-red-500 font-medium">Error: {error}</div>;
  if (!blog) return <div className="text-center text-gray-600">No blog found.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Blog Title */}
      <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>

      {/* ✅ Feature Image (if available) */}
      {blog.feature_image && (
        <img
          src={blog.feature_image}
          className="rounded-md mt-4 w-full max-h-[500px] object-cover"
          alt={blog.title}
        />
      )}

      {/* ✅ Video Embed (if available) */}
      {blog.video_url && (
        <div className="mt-4 aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[400px] rounded-md"
            src={blog.video_url.replace("watch?v=", "embed/")}
            title="Blog Video"
            allowFullScreen
          />
        </div>
      )}

      {/* ✅ Blog Content */}
      <article className="mt-4 space-y-6">
        {blog.sections?.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold text-gray-800">{section.heading}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>

            {/* ✅ Section Image (if available) */}
            {section.image && (
              <img
                src={section.image}
                className="mt-4 w-full rounded-md shadow-md"
                alt={section.heading}
              />
            )}
          </div>
        ))}
      </article>
    </div>
  );
};

export default BlogDetail;
