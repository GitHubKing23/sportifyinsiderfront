import React, { useEffect, useState } from 'react';
import { fetchAllBlogs } from '../src/modules/blog/services/blogService';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index} className="p-4 border-b border-gray-300">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default Home;
