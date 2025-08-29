import { useState, useEffect } from 'react';

function AnalogClock() {
  return (
    < >

    <div style={{ position: "relative"}}>



       {Array.from({ length: 12 }).map((_, i) => {
  return (
    <div
  key={i}
  style={{
    position: 'absolute',
    width: '3px',
    height: '20px',
    backgroundColor: 'black',
    top: '0',
    left: '50%',
    marginLeft: '-1.5px',
    transformOrigin: 'bottom center',
    transform: `rotate(${i * 30}deg)`
  }}
/>

    
  )
})}

<div style={{position:"absolute"}}></div>
    </div>
    

    </>
  )
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