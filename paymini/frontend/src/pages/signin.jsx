import React, { useState } from 'react'
import axios from 'axios'
import { FaEye, FaOdnoklassniki, FaYenSign } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";


const signin = () => {
  const[formData2, setFormdata2] = useState({email:"", password:""})
  const [error, setError] = useState(false)
  const[show, setShow] =useState(false)
  const[isSigned,setIsSigned]=useState(false)

  const navigate = useNavigate();



  const handleChange=(e)=>{
    setFormdata2({ ...formData2,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
e.preventDefault();
    
    try{
      setError(false)
     const response = await axios.post("http://localhost:3000/api/v1/user/signin", formData2);
            console.log("Signup in success", response.data);
            

            if(response.data.message==="You are signed in "){
              setIsSigned(true)
            }

            localStorage.setItem("token", response.data.token)
                alert(response.data.message)
            

    }catch(err){

      setError(true);
      console.error(`The error is ${err}`)


    }
    

  }

if (isSigned) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='font-mono text-3xl mb-6'>You are Signed in!</h2>
      <button
        onClick={() => navigate("/dashboard")}
        className='border-2 border-blue-500 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hover: scale-125 hover:shadow-2xl shadow-blue-900 hover:-translate-y-2'
      >
        Go to Dashboard
      </button>
    </div>
  );
}

  return (
    
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-100'>
      
      
      <h2 className='p-4 font-mono text-3xl mb-3'> Please SignIn!</h2>
      <form className='min-h-50 flex flex-col border-3 rounded-xl hover:shadow-2xl shadow-blue-700  backdrop-blur-lg hover:scale-120 hover:-translate-y-2 p-4 gap-6 transition-all ease-in-out duration-400  hover:bg-gradient-to-br hover:from-blue-500 hover: to-white/90 '>
        <input name="email" onChange={handleChange} className='border-black/40 rounded-lg border-3  p-3 mt-2   bg-white/10 focus:to-blue-800 hover:bg-white duration-200' type="text" placeholder='enter email'></input>
        
        <div className='flex items-center gap-4'> 
        <input name="password" onChange={handleChange} className='border-black/40 rounded-lg hover:bg-white border-3 focus: p-3   focus:to-blue-800 duration-200' type={show ? "text": "password"} placeholder='enter Password'>
        </input>
        <button type='button' onClick={()=>setShow(prev=>!prev)}>
        <FaEye />
          </button>
        </div>
        <div className='flex justify-center items-center w-full mt-3'>
         <button  type="submit" onClick={handleSubmit} className='border-2 focus:ring-2 shadow-blue-600 hover:shadow-lg hover:-translate-y-2 rounded-lg px-2 transition-all ease-in-out duration-250 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-600 hover:via-blue-300 hover:to-white '>Submit</button>
         </div>
      </form>

      {error && <div className=' relative bg-gradient-to-r from-red-600 p-3 border-2 rounded-xl shadow-2xl animate-bounce translate-y-10' onClick={()=>setError(prev=>!prev)}> 
        <p>
        Occured a error while signing in, try again
        </p>
        <button className='absolute left-50 p-4' type='button' ><FaOdnoklassniki/></button>
        </div>}
    </div>
  )

 
}

export default signin