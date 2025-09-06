import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddBlog from "./pages/Addblog";
import App from "./App"

const Layout = () => {
  return (
    <Routes>

        <Route path="/" element={<App />} ></Route>
        <Route path="/add" element={<AddBlog />} ></Route>
    </Routes>
  )
}

export default Layout