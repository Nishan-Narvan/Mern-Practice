import { useState,useRef } from 'react'

import './App.css'

function App() {
  const [city, setCity] = useState("")
  const [data, setData] = useState(null);
   const [error, setError] = useState(null);

  const inputRef = useRef();
  






  async function wother(){
    if(!city) return ;
    try{

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e9ea3c9c2e0acf519e8df348f6d0e3a2&units=metric`)

      const data = await response.json();

       if(data.cod !== 200 && data.cod !=="200"){       
        setError(data.message)
        setData(null);
       }else{

       setData(data);
       setError(null);
      }
      

    }catch(err){
      console.error(`This is the error occured ${err}`)

    }
  }

  return (
    <>
    <input value={city} placeholder="Enter your city here" onChange={(e)=>setCity(e.target.value)} ></input>


    <div style={{margin:"20px"}}>This is the city name you entered:  {city}</div>

    <button style={{margin:"20px"}}  onClick={wother}>Fetch weather data</button>

{error && <div style={{color:"red"}}>{error}</div>}
{data && (
        <div>
          <h3>Temperature: {data.main.temp}°C</h3>
          <p>Condition: {data.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
        </div>
         
      )}

    
    </>
  )
}

export default App
