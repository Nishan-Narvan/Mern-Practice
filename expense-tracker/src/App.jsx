import { useState,useEffect } from 'react'
import "./App.css"

function App() {
  const [array, setArray] = useState(() => {
  const saved = localStorage.getItem("expenses");
  return saved ? JSON.parse(saved) : [];
});

  const [title,setTitle] =useState("");
  
  const [amount, setAmount] =useState(0);
  const [category, setCategory] = useState("");
  const [cot , setCot]= useState("");





  const handleSubmit=()=>{
    if (!title || !amount || !category) return alert("Please fill all fields");


    const obj={
     id: Date.now(),
      title: title,
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
      category: category
    }
    setArray([...array, obj])
    setTitle("")
    setAmount(0)
    setCategory("")
  }


  const handleremove=(idval)=>{
    const newarr = array.filter((e)=>e.id!==idval)
    setArray(newarr)
  }


  const filteredarray = cot!==""? array.filter((e)=> e.category===cot): array

  const total = filteredarray.reduce((sum, element)=> sum + element.amount,0)


 

  useEffect(()=>{
    console.log("Saving to localStorage:", array);
    localStorage.setItem("expenses", JSON.stringify(array));

  },[array])

  return (
    <>
    <h1 style={{ height:"180px"}}>Expense Tracker</h1>
    <div style={{gap:"20px", display:"flex"}}>   
       <input style={{backgroundColor:"black", borderRadius:"20px"}} value={title} placeholder="Enter your title here" onChange={(e)=>setTitle(e.target.value)}></input>
    <input style={{backgroundColor:"black", borderRadius:"20px"}} value={amount} placeholder="Enter your amount here" onChange={(e)=>setAmount(Number(e.target.value))}></input>
   <select style={{backgroundColor:"black", borderRadius:"20px"}} value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">Select category</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Bills">Bills</option>
  <option value="Other">Other</option>
</select>

    <button onClick={handleSubmit}>Submit this expense</button></div>

    <div>----------------</div>
    <select style={{backgroundColor:"green", borderRadius:"20px"}} value={cot} onChange={(e)=>setCot(e.target.value)}>
      <option value="">Select category to show expense for</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Bills">Bills</option>
  <option value="Other">Other</option>
      
    </select>
    <ul>
      {filteredarray.map((e)=>{
        return <li key={e.id}><div style={{ display:"flex", padding:"30px",backgroundColor:"black", borderRadius:"30px", margin:"30px", width:"700px", justifyContent:"space-between" }}>   
          {e.title}<div>  <div> {e.category}</div>   ₹ {e.amount}</div><div>{e.date}</div>
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
