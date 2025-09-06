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
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={6}
          style={{ width: "100%", padding: 8, marginTop: 8 }}
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
