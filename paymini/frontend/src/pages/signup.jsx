import React from 'react'
import {useState} from 'react'
import { FaUser, FaUserCircle, FaIdBadge, FaLock } from "react-icons/fa";
import axios from 'axios'

const Signup = () => {

    const [formData, setFormdata] = useState({
    
    firstName: "",
    lastName: "",
     username: "",
    password: ""
    })
   


    const handleChange= (e)=>{
        setFormdata({ ...formData, [e.target.name]: e.target.value})
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            const response = await axios.post("http://localhost:3000/api/v1/user/signup", formData);
            console.log("Signup success", response.data);
            

                alert(response.data.message)
            
            
        }catch(err){

            console.error("signup failed",err)

        }
    }
const [showPassword, setShowPassword] = useState(false);

return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-black">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 max-w-sm w-full p-4 border rounded-lg bg-white shadow"
            >
                <div className="relative">
                    <FaUserCircle className="absolute left-2 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="border p-2 pl-8 rounded w-full"
                    />
                </div>
                <div className="relative">
                    <FaUser className="absolute left-2 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="border p-2 pl-8 rounded w-full"
                    />
                </div>
                <div className="relative">
                    <FaIdBadge className="absolute left-2 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="border p-2 pl-8 rounded w-full"
                    />
                </div>
                <div className="relative">
                    <FaLock className="absolute left-2 top-3 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border p-2 pl-8 rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-2 text-gray-600"
                        tabIndex={-1}
                    >
                        {showPassword ? "🫣" : "👁️"}
                    </button>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    </>
)
}

export default  Signup