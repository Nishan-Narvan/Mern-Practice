import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from "../assets/photo-1501167786227-4cba60f6d58f-modified.jpg"

const dashboard = () => {

  
   const[data,setData] =useState([])
   const [page,setPage] = useState(1)


   const[balance,setBalance]= useState(" ")



   




   const [searchtext, setSearchtext]= useState("n")
  
   const limit=5

   const navigate = useNavigate();


   const inputref= useRef()

  const handleChange=()=>{

    inputref.current.focus();
    setSearchtext(inputref.current.value);

  }
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data && response.data.balance !== undefined) {
            setBalance(Number(response.data.balance).toFixed(2));
          }
        } else {
          console.error('No token found');
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };
    fetchBalance();
  }, []);

  useEffect(()=>{

    const fetch =async()=>{

      try{
     const token = localStorage.getItem('token');

      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchtext}&page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
      console.log(response.data.users)
      setData(response.data.users)
    }
  catch(err){
      console.error(`There's some backend error ${err}`)
    }}
    fetch()

  },[searchtext])



  
return(
  <>
 
  
  <div className='relative overflow-hidden w-screen h-screen flex flex-col justify-center items-center bg-white/20  '>
   <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-65 -z-10"
      />

      
     <div className=' w-full h-80 justify-center items-center  text-center mt-17  
      '>
        <div className='font-mono text-4xl  font-semibold text-balck/80'>PAYMini</div>
        <input className=' bg-gray-500 w-90 hover:bg-white/50 duration-200 mt-8 p-3 rounded-3xl backdrop-blur-lg 
         border-4  border-gray-500 mx-10' ref={inputref} onChange={handleChange} type='text' placeholder='search users' >
        </input>
        <div className='mt-3 font-semibold text-white mb-4'>Balance: {balance} </div>
        </div>
        <div className="bg-black/90  rounded-3xl min-w-[820px] min-h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 mb-19">
{data.map((user) => (
  <div key={user._id} className="flex justify-center mt-8">
    <div className="max-w-lg  w-full bg-gray-600/90 text-white text-xl font-mono rounded-xl p-5 hover:-translate-y-1 duration-200  flex justify-between items-center shadow-lg">
      <div>
        {user.firstName} {user.lastName}
      </div>
      <button
        onClick={() => navigate(`/transfer/${user._id}`)}
        className="bg-black/90 text-white text-xl font-mono p-2 rounded-2xl hover:scale-110 duration-200 cursor-pointer"
      >
        Send Money
      </button>
    </div>
  </div>
))}
</div>


  <div className='text-center text-md font-bold mb-3 text-black/60 '>@PAYmini</div>
  </div>
  
  </>
)}
export default dashboard