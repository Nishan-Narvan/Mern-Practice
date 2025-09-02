import { useState } from 'react'
import "./App.css"

function App() {
  const [array, setArray] = useState([])
  const [title,setTitle] =useState("");
  
  const [amount, setAmount] =useState(0);



const total = array.reduce((sum, element)=> sum + element.amount,0)

  const handleSubmit=()=>{

    const obj={
     id: Date.now(),
      title: title,
      amount: Number(amount),
      date: new Date().toLocaleDateString()
    }
    setArray([...array, obj])
    setTitle("")
    setAmount(0)
  }


  const handleremove=(idval)=>{
    const newarr = array.filter((e)=>e.id!==idval)
    setArray(newarr)
  }

  return (
    <>
    <div style={{gap:"20px", display:"flex"}}>   
       <input value={title} placeholder="Enter your title here" onChange={(e)=>setTitle(e.target.value)}></input>
    <input  value={amount} placeholder="Enter your amount here" onChange={(e)=>setAmount(Number(e.target.value))}></input>
    <button onClick={handleSubmit}>Submit this expense</button></div>

    <div>----------------</div>
    <ul>
      {array.map((e)=>{
        return <li key={e.id}><div style={{ display:"flex", padding:"30px",backgroundColor:"black", borderRadius:"30px", margin:"30px", width:"500px", justifyContent:"space-between" }}>   
          {e.title}<div>      {e.amount}</div><div>{e.date}</div>
          <button onClick={()=>(handleremove(e.id))} style={{width:"110px", }}>remove</button>
        </div>
        </li>
      })}
      
    </ul>
    <h3>Total Expenses: ₹{total}</h3>
    </>
  )
}

export default App
