import { useState } from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Dashboard from './pages/dashboard'
import Transfer from './pages/transfer'

import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/transfer" element={<Transfer />}></Route>
      <Route path="/dashboard" element={<dashboard/>}></Route>
      <Route path="/transfer" element={<transfer/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
