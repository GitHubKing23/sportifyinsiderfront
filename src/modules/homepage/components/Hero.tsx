import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

interface HeroProps {
  title: string;
  imageUrl?: string;
  articleUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, imageUrl, articleUrl }) => {
  useEffect(() => {
    console.log("✅ Hero Component Loaded");
    console.log("Props Received:", { title, imageUrl, articleUrl });
  }, [title, imageUrl, articleUrl]); // ✅ Fixed useEffect Dependencies Warning

  return (
    <section className="relative w-full h-[500px] bg-gray-900 flex items-center justify-center">
      {/* ✅ Debugging Banner */}
      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded shadow-md">
        Debug: Hero Loaded
      </div>

      {/* ✅ Background Image (If Provided) */}
      {imageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt="Featured Article"
            layout="fill"
            objectFit="cover"
            priority
            className="brightness-75"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"></div>
      )}

      {/* ✅ Overlay Content */}
      <div className="relative z-10 text-white text-center p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl">
          <Link href={articleUrl} className="hover:underline">
            {title}
          </Link>
        </h1>
      </div>
    </section>
  );
};

// ✅ Ensure default export is correctly defined
export default Hero;
