import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BlogList from "./pages/Bloglist.jsx";
import AddBlog from "./pages/Addblog.jsx";
import { BlogProvidercomp } from "./context/BlogContext.jsx";

function App() {
  return (
    <BlogProvidercomp>
      <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/">Blogs</Link>
        <Link to="/add">Add Blog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/add" element={<AddBlog />} />
      </Routes>
    </BlogProvidercomp>
  );
}

export default App;
