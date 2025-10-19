import React from 'react'
import {useState} from 'react'
import { FaUser, FaUserCircle, FaIdBadge, FaLock } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [formData, setFormdata] = useState({
    
    firstName: "",
    lastName: "",
     email: "",
    password: ""
    })
   


    const handleChange= (e)=>{
        setFormdata({ ...formData, [e.target.name]: e.target.value})
    }

  const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            const response = await axios.post("http://localhost:3000/api/v1/user/signup", formData);
            console.log("Signup success", response.data);
            

                alert(response.data.message)
            
                if(response.data.message==="User alreay exists, please sign in"||"User successfully created"){
                    setSigndone(true)
                }
            
        }catch(err){

            console.error("signup failed",err)

        }
    }
const [showPassword, setShowPassword] = useState(false);
const [signdone, setSigndone] = useState(false)


if(signdone){
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1521790366323-4d5a0c65a9b8?auto=format&fit=crop&w=1200&q=80"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-75 -z-10"
      />

      {/* Overlay content */}
      <div className="text-center text-white px-6">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg mb-6 text-gray-200 max-w-md mx-auto">
          Transfer funds, manage your account, and track transactions — all in one place.
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="px-6 py-3 bg-blue-600 hover:scale-150 ease-in-out hover:bg-blue-700 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-800 cursor-pointer"
        >
          Go to Signin →
        </button>
      </div>
    </div>
  );
}


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
                        placeholder="email"
                        name="email"
                        value={formData.email}
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