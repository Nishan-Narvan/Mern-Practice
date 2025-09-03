import { useState } from 'react'
import { useNavigate} from "react-router-dom"


import './App.css'

function App({carray, setCarray}) {
  const [data, setdata] = useState([])
  
  const navigate = useNavigate();


const handleFetch = async () => {

  try {

    const res = await fetch("https://fakestoreapi.com/products");
    const datao = await res.json();
    console.log(datao);
    setdata(datao)

  } catch (err) {
    console.error(`Your error is ${err}`);
  }

}

const cart =(identity)=>{

  const toadd = data.find((e)=>e.id===identity)

  const exist = carray.find((item)=> item.id===identity);

  if(exist){
    setCarray(carray.map((item)=>item.id===identity? {...item, quantity: item.quantity+1}: item))
  }else{
   setCarray([...carray,{...toadd, quantity:1 }])

  }

  


}

  return (

    <>
     <div>
      <button onClick={handleFetch}>Fetch</button>
       <div> <button onClick={()=>navigate("/cart")}>  Go to cart{carray.reduce((acc, item)=> acc+item.quantity,0)}</button> </div>
     </div>
      <div style={{ 
        display: "grid", 
       gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
, 
        gap: "20px", 
        marginTop: "20px" 
      }}>
        {data.map((e) => (
          <div 
            key={e.id} 
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              cursor:"pointer",
              
            }}
          >
            <img 
              src={e.image} 
              alt={e.title} 
              style={{ width: "150px", height: "150px", objectFit: "contain" }} 
            />
            <h3>{e.title}</h3>
            <p style={{ fontWeight: "bold" }}>₹ {e.price}</p>
            <button onClick={()=>cart(e.id)}>Add To CarT</button>
          </div>
        ))}
      </div>

     
    </>
  )
}

export default App
