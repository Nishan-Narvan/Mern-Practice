import React, { useState } from 'react'
import axios from 'axios'
import { FaEye, FaOdnoklassniki, FaYenSign } from 'react-icons/fa'

const signin = () => {
  const[formData2, setFormdata2] = useState({username:"", password:""})
  const [error, setError] = useState(false)
  const[show, setShow] =useState(false)
  const[isSigned,setIsSigned]=useState(false)


  const handleChange=(e)=>{
    setFormdata2({ ...formData2,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
e.preventDefault();
    
    try{
      setError(false)
     const response = await axios.post("http://localhost:3000/api/v1/user/signin", formData2);
            console.log("Signup in success", response.data);
            

            if(response.data.message==="You are signed in"){
              setIsSigned(true)
            }
                alert(response.data.message)
            

    }catch(err){

      setError(true);
      console.error(`The error is ${err}`)


    }
    

  }


   if (isSigned) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <h2 className='font-mono text-3xl'>You are Signed in, head to Transactions</h2>
      </div>
    )
  }
  return (
    
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-100'>
      
      
      <h2 className='p-4 font-mono text-3xl'> Please SignIn!</h2>
      <form className='min-h-50 flex flex-col border-3 rounded-xl hover:shadow-2xl shadow-blue-700  backdrop-blur-lg hover:scale-120 hover:-translate-y-2 p-4 gap-6 transition-all ease-in-out duration-400  hover:bg-gradient-to-br hover:from-blue-600 hover: via-green-100 '>
        <input name="username" onChange={handleChange} className='border-black/40 rounded-lg border-2 focus: p-3 mt-2  focus:to-blue-800 hover:bg-white duration-200' type="text" placeholder='enter username'></input>
        
        <div className='flex items-center gap-4'> 
        <input name="password" onChange={handleChange} className='border-black/40 rounded-lg hover:bg-white border-2 focus: p-3   focus:to-blue-800 duration-200' type={show ? "text": "password"} placeholder='enter Password'>
        </input>
        <button type='button' onClick={()=>setShow(prev=>!prev)}>
        <FaEye />
          </button>
        </div>
        <div className='flex justify-center items-center w-full mt-3'>
         <button  type="submit" onClick={handleSubmit} className='border-1 focus:ring-2 shadow-blue-600 hover:shadow-lg hover:-translate-y-0.5 rounded-lg px-2 transition-all ease-in-out duration-250 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-200 '>Submit</button>
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