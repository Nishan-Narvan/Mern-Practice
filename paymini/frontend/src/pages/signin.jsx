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
    <div className='relative overflow-hidden flex flex-col items-center justify-center min-h-screen'>
      <img
        src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-75 -z-10"
      />
      <h2 className='font-mono text-3xl mb-6'>You are Signed in!</h2>
      <button
        onClick={() => navigate("/dashboard")}
        className='border-2 border-blue-500 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hover: scale-125 hover:shadow-2xl shadow-blue-900 hover:-translate-y-2 cursor-pointer'
      >
        Go to Dashboard
      </button>
    </div>
  );
}

  return (
    
    <div className='relative overflow-hidden flex flex-col justify-center items-center w-screen h-screen '>
       <img
        src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-75 -z-10"
      />
      
      <h2 className='p-4 font-mono text-white text-3xl mb-3'> Please SignIn!</h2>
      <form className='min-h-50 flex flex-col text-lg border-3 rounded-xl  shadow-blue-700  bg-white/70 hover:scale-100 hover:-translate-y-1 p-4 gap-4 transition-all ease-in-out duration-400  hover:bg-gradient-to-br  hover: to-white/90 '>
      
        <input name="email" onChange={handleChange} className='border-black/40 rounded-lg border-3  p-3 mt-4   bg-white/10 focus:to-blue-800 hover:bg-white duration-200' type="text" placeholder='enter email'></input>
        
        <div className='flex items-center gap-4'> 
        <input name="password" onChange={handleChange} className='border-black/40 rounded-lg hover:bg-white border-3 focus: p-3   focus:to-blue-800 duration-200' type={show ? "text": "password"} placeholder='enter Password'>
        </input>
        <button type='button' onClick={()=>setShow(prev=>!prev)}>
        <FaEye />
          </button>
        </div>
        <div className='flex justify-center items-center w-full mt-3'>
         <button  type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2  w-full rounded-lg shadow-2xl hover:scale-105 duration-200 hover:-translate-y-2">Submit</button>
         </div>
         <div className='text-center text-sm text-black/60 '>@PAYmini</div>
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