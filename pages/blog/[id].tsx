import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { fetchBlogById } from "@services/blogService";
import { QRCodeCanvas } from "qrcode.react";

// ✅ Dynamic imports for comments
const CommentForm = dynamic(
  () => import("@modules/comments/components/CommentForm").then((mod) => mod.default),
  { ssr: false }
);

const CommentList = dynamic(
  () => import("@modules/comments/components/CommentList").then((mod) => mod.default),
  { ssr: false }
);

// ✅ Blog Interface
interface Blog {
  _id: string;
  title: string;
  feature_image?: string;
  video_url?: string;
  tipAddress?: string;
  sections?: { heading: string; content: string }[];
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const loadBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        if (!data) {
          setError(`Blog with ID ${id} not found.`);
        } else {
          setBlog(data);
        }
      } catch (err) {
        console.error("❌ Error loading blog:", err);
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

  const previewContent =
    blog.sections?.[0]?.content?.slice(0, 150) ||
    "Read the latest update on SportifyInsider.";
  const image = blog.feature_image || "https://sportifyinsider.com/default-preview.png";
  const url = `https://sportifyinsider.com/blog/${blog._id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: previewContent,
    image: image,
    author: {
      "@type": "Organization",
      name: "SportifyInsider"
    },
    publisher: {
      "@type": "Organization",
      name: "SportifyInsider",
      logo: {
        "@type": "ImageObject",
        url: "https://sportifyinsider.com/logo.png"
      }
    },
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <>
      <Head>
        <title>{blog.title} | SportifyInsider</title>
        <meta name="description" content={previewContent} />

        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={previewContent} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={previewContent} />
        <meta name="twitter:image" content={image} />

        {/* ✅ Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        {blog.feature_image && (
          <div className="relative w-full h-[400px] mt-4">
            <Image
              src={blog.feature_image}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-md object-cover"
            />
          </div>
        )}

        {blog.video_url && (
          <div className="relative w-full pb-[56.25%] mt-4">
            <iframe
              src={blog.video_url.replace("watch?v=", "embed/")}
              className="absolute top-0 left-0 w-full h-full rounded-md"
              allowFullScreen
              title="Blog Video"
            />
          </div>
        )}

        <article className="mt-6">
          {blog.sections?.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </article>

        {blog.tipAddress && (
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md text-white text-center">
            <h3 className="text-2xl font-bold mb-2">💸 Tip the Author</h3>
            <p className="text-sm text-gray-300 mb-4 break-words">{blog.tipAddress}</p>

            <div className="flex justify-center mb-2">
              <QRCodeCanvas
                value={blog.tipAddress}
                size={150}
                fgColor="#ffffff"
                bgColor="transparent"
                imageSettings={{
                  src: "/eth-logo.png",
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-xs text-gray-400">Scan with your wallet to tip ETH</p>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">💬 Comments</h2>
          <CommentForm postId={blog._id} onCommentAdded={() => setRefresh(!refresh)} />
          <CommentList key={refresh.toString()} postId={blog._id} />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
