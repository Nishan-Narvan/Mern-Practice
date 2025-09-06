// components/BlogList.jsx
import React from "react";
import { useBlog } from "../context/BlogContext";

export default function BlogList() {
  const { blogs, loading, error, fetchBlogs } = useBlog();

  if (loading) return <p>Loading blogs...</p>;
  if (error) return (
    <div>
      <p style={{color:"red"}}>Error: {error}</p>
      <button onClick={fetchBlogs}>Retry</button>
    </div>
  );

  return (
    <div>
      {blogs.length === 0 ? <p>No blogs yet</p> : (
        blogs.map((b) => (
          <article key={b._id || b.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
            <h3>{b.title}</h3>
            <p>{b.content}</p>
            <small>By {b.author || "Unknown"} • {new Date(b.createdAt).toLocaleString()}</small>
          </article>
        ))
      )}
    </div>
  );
}
