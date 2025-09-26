
import Dashboard from "./pages/Dashboard"
import { SignUp } from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import SharedLink from "./pages/SharedLink"
import { useState } from "react"

const App = () => {
 
  return (
   
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<SignUp/>}  />
    <Route path="/signin"  element={<SignIn/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/brain/:shareId" element={<SharedLink/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App