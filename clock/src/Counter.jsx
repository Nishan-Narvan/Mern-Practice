import React from 'react'
import {useState, useEffect, useRef} from 'react'

const Counter = () => {
     const [timer,setTimer] = useState(0);
     const intervalRef = useRef(null);



  


       const handleStart=()=>{

        if(intervalRef.current !==null) return;
    
        intervalRef.current= setInterval(()=>{
            
            setTimer(prev=>prev+1)
        },1000)

}
const handleStop=()=>{
    clearInterval(intervalRef.current);
    intervalRef.current= null
}
    

useEffect(()=>{
return () => {
    clearInterval(intervalRef.current);}
},[])
  return (
    <>This is my counter
    {/* functionality is we have a button when we start it start counting every second */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"center", margin :"5%"}}>
          <div style={{ backgroundColor:"black", width:"100px", border:"1px solid black", borderRadius:"30px"}}>{timer}</div>
    </div>
  

    <div style={{ display: "flex", gap:"12px", justifyContent:"center", alignItems:"center"}}>

    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>
    <button onClick={()=>setTimer(0)}>Reset</button>
    </div>
    
<div style={{ margin:"10px", backgroundColor:"black"}}>-------------------------</div>
    


    </>
  )
}

export default Counter


// For transform origin property , top left center ki values y axis  ke liye haiin, left right center ki values x axis ke liye hain, ek pin point karo div pe according to these values , then uske around ghumege, like pointing apin on a photo rectangle---for % values first ki x , second argument is for, 100% is to the right or to the bottom