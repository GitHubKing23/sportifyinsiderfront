import Link from "next/link";

interface Blog {
    _id: string;
    title: string;
    category: string;
}

// ✅ Accept `blogs` as a prop
const FeaturedArticles: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
    return (
        <section className="py-12 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
                    Featured Sports Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.length === 0 ? (
                        <p className="text-center text-gray-400">No articles found.</p>
                    ) : (
                        blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-gray-800 rounded-lg p-4"
                            >
                                <h3 className="text-xl font-bold">
                                    <Link href={`/blog/${blog._id}`} className="hover:text-yellow-400">
                                        {blog.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">{blog.category}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticles;
