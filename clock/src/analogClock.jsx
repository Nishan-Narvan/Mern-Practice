import { useState, useEffect } from "react";

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  


  useEffect(()=>{
const interval=setInterval(()=>{

setTime(new Date());
},1000)

  return ()=> {
    clearInterval(interval);

};

},[]);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const sangle = s*6;
  const mangle= m*6+s*0.1;
  const hangle= h*30+m*0.5;



  return (
   <>
   <div style={{display:"flex" , justifyContent:"center", alignItems:"center", height:"10vh", margin:"120px"}}>

   <div style={{ position: "relative", borderRadius:"50%", backgroundColor:"red", width:"260px", height:"260px"}}>


    

{Array.from({length:12}, ).map((_,i)=>{
  return<div key={i} style={{top:"48%",left:"50%",position:"absolute", height:"13px", width:"2px",backgroundColor:"black",transformOrigin:"center center ", transform:`rotate(${i*30}deg) translateY(-120px)`}}>{i+1}


    
  </div>

  
})}


<div style={{ position: "absolute",left:"50%", height:"73px",width:"4px",transformOrigin:"bottom center", transform:`translateY(84%) rotate(${hangle}deg )`,backgroundColor:"black"}}>h</div>

<div style={{ position: "absolute",top:"7%",left:"50%", height:"113px",width:"4px",transformOrigin:"bottom center", transform:`rotate(${mangle}deg)`,backgroundColor:"black"}}>m</div>



<div style={{ position: "absolute",top:"20%",left:"50%", height:"83px",width:"2px",transformOrigin:"bottom center", transform:`rotate(${sangle}deg)`,backgroundColor:"blue"}}>s</div>



   </div>



   </div>
   </>
  );
}

export default AnalogClock;




// 1	Runaway Button	Event handling & fun interactivity
// 2	Click-to-Change Background	Simple JS DOM operations
// 3	Rainbow Progress Bar	CSS animations + dynamic styling
// 4	Bouncing Color Balls	Canvas or div movement + loops
// 5	Catch the Falling Stars Game	Game logic, arrow controls, score
// 6	Cursor-Following Pet	Mouse events & positioning
// 7	Calculator (React)	State, logic, UI interactions
// 8	To-Do List (localStorage + login)	CRUD, state, basic auth
// 9	Weather App (API)	Fetch, error handling, display UI
// 10	GitHub Profile Search	API fetch + search UI
// 11	Movie App (TMDB)	External API, list filtering
// 12	CV Builder / Interactive Resume	Forms, UI design, PDF export
// 13	Mini Quiz Game	State, timer, question flow
// 14	Notes App (save in browser)	CRUD, localStorage
// 15	Expense Tracker (simple)	Form, list, total calculation





