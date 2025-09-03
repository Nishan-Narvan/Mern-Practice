import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Cart from "./Cart";

export default function Layout() {
  const [carray, setCarray] = useState([]); // shared state here

  return (
    <Routes>
      <Route path="/" element={<App carray={carray} setCarray={setCarray} />} />
      <Route path="/cart" element={<Cart carray={carray} setCarray={setCarray} />} />
    </Routes>
  );
}
