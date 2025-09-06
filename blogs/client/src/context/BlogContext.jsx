// context/BlogContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const BlogContext = createContext();

const API_BASE = "http://localhost:3000";

export const BlogProvidercomp = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_BASE}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add blog
  const addBlog = async (blogData) => {
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/api/blogs`, blogData);
      setBlogs((prev) => [...prev, res.data]); // append new blog
      return res.data;
    } catch (err) {
      console.error("addBlog error", err);
      setError(err.message);
      throw err;
    }
  };

  // ✅ Run once on mount → fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading, error, fetchBlogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
export default BlogContext;
