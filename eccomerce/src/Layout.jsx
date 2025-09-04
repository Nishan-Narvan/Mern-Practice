import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from './Success'

export default function Layout() {
  const [carray, setCarray] = useState([]); // shared state here

  return (
    <Routes>
      <Route path="/" element={<App carray={carray} setCarray={setCarray} />} />
      <Route path="/cart" element={<Cart carray={carray} setCarray={setCarray} />} />
      <Route path="/checkout"  element={<Checkout/>}></Route>
      <Route path="/success" element={<Success carray={carray} setCarray={setCarray}/>}></Route>
    </Routes>
  );
}
