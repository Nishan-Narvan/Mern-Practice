import { useState, useEffect } from 'react'
import './App.css'
import AnalogClock from './analogClock';
import Counter from "./Counter"

function App() {

  const [time, setTime] = useState("");
  const [mode, setMode] =useState("12h");





  useEffect(()=>{
  const getItem=()=>{

    const toma = new Date().toLocaleTimeString('en-US',{
     hour12:mode==="24h"? false : true
    });
    setTime(toma);
  }

  getItem();



  const Interval = setInterval(()=>{
    getItem();
  },1000)



    return (()=> clearInterval(Interval))
  },[mode])
 
  return (
    <>
      <h2>This is my clock {time} </h2>
     <button onClick={()=>setMode(mode==="12h"? "24h": 
      "12h"
     )}>Switch to  {mode==="24h" ? "12h" :"24h"} mode</button>
     <div></div>
     <div style={{ margin:"70px"}}><AnalogClock/></div>

     <div><Counter/></div>
     
    </>
  )
}

export default App
