import React from 'react'
import { useState } from 'react'

const Checkout = () => {
  const [form, setForm] =useState({
    name:"",
    address:"",
    payment_method:""
  })


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form); // for now, just check output in console
  }
  return (
    <>
    <form  style={{display:"flex", flexDirection:"column", gap:"50px", alignItems:"flex-start"}} onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange}></input>
      </label>
      <label>
        Address:
        <input name="address" value={form.address} onChange={handleChange}/>
      </label>
      <label>
        Payment-Method:
        <select name="payment_method" value={form.payment_method} onChange={handleChange}>

          <option value=""> Select</option>
          <option value="card">Credit</option>
          <option value="upi"> UPI</option>
          <option value="cod">COD</option>
        </select>
       
      </label>
      <button type="submit">Submit your details</button>
    </form>
    </>
  )
}

export default Checkout