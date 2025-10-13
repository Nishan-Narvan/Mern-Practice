import React, { useState } from 'react';
import { useBlog } from "../context/BlogContext";

const Addblog = () => {
  const { addBlog } = useBlog();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!title.trim() || !content.trim()) {
      setLocalError("Title and content required");
      return;
    }

    setSubmitting(true);
    try {
      await addBlog({ title: title.trim(), content: content.trim(), author: "Anonymous" });
      setTitle("");
      setContent("");
    } catch (err) {
      setLocalError("Failed to add blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 , display:"flex",flexDirection:"column", justifyContent:"center", marginTop:"200px",alignItems:"center",
      width: "100%", padding: 8,
    }}>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            border: "2px solid #444",
            borderRadius: "4px",
            padding: "10px",
            width: "400px",
            marginBottom: "16px",
            fontSize: "16px"
          }}
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={6}
          style={{
            border: "2px solid #444",
            borderRadius: "4px",
            padding: "10px",
            width: "400px",
            marginBottom: "16px",
            fontSize: "16px",
            resize: "vertical"
          }}
        />
      </div>
      {localError && <div style={{ color: "red" }}>{localError}</div>}
      <button type="submit" disabled={submitting} style={{ marginTop: 8 }}>
        {submitting ? "Adding..." : "Add Blog"}
      </button>
    </form>
  );
};
export default Addblog;
