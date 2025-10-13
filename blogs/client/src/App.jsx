import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BlogList from "./pages/Bloglist.jsx";
import AddBlog from "./pages/Addblog.jsx";
import { BlogProvidercomp } from "./context/BlogContext.jsx";

function App() {
  return (
    <BlogProvidercomp>
      <div
        style={{

          background: "#222",
          color: "#eee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: "24px",
            padding: "16px 32px",
            background: "linear-gradient(90deg, #111 60%, #444 100%)",
            borderBottom: "1px solid #333",
            position: "sticky",
            top: 0,
            zIndex: 10,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#eee",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "6px 12px",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
          >
            Blogs
          </Link>
          <Link
            to="/add"
            style={{
              color: "#eee",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "6px 12px",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
          >
            Add Blog
          </Link>
        </nav>
        <div
          style={{
            flex: 1,
            width: "100%",
            background: "#222",
            minHeight: "calc(100vh - 60px)",
          }}
        >
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/add" element={<AddBlog />} />
          </Routes>
        </div>
      </div>
    </BlogProvidercomp>
  );
}

export default App;
