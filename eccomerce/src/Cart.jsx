import React from 'react'
import {useState } from "react"

const Cart = ({carray, setCarray}) => {
    



const handleRemove=(id)=>{

 
  
    setCarray(carray.map((item)=>item.id===id? {...item, quantity: item.quantity-1}:item).filter((item)=>item.quantity>0))
  


}

const increaseq =(id)=>{

  setCarray(carray.map((item)=>item.id===id? {...item, quantity: item.quantity+1 } :item))
}



  return (
    <>
      <div>This is your cart</div>
      {carray.length === 0 && <p>no items yet</p>}
      <h3>Total amount is Rs { carray.reduce((acc,item)=>acc+item.price*item.quantity,0)}</h3>
      {carray.map((e, index) => (
        <div key={index}  style={{ backgroundColor:"black",borderRadius:"20px" ,border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{e.title}</h3>
          <p>{e.price}</p>
            <p>Quantity: {e.quantity}</p>
          <img 
              src={e.image} 
              alt={e.title} 
              style={{ width: "150px", height: "150px", objectFit: "contain" }} 
            />
            <button onClick={()=>increaseq(e.id)} style={{ margin:"10px"}}> +</button>
           
            <button onClick={()=>handleRemove(e.id)}>Remove from cart</button>
            
        </div>
      ))}
    </>
  )
}

export default Cart