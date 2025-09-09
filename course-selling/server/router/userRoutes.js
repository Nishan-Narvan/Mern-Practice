import express from 'express'
import {  userModel } from "../models/userSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import authware from '../middlewares/auth.js';




const JWT_SECRET = "change_me";


const userRouter = express.Router()
// I always forget how to init the router


userRouter.get("/", async (req,res)=>{

 
  res.json({message: "get req endpoint"})
})




 
userRouter.post("/signup", async(req,res)=>{


   const {email, password, firstName, lastName} = req.body;

   const hashed = await bcrypt.hash(password,10)

  const user = await  userModel.create({
    email: email,
    password:hashed,
    firstName: firstName,
    lastName: lastName
  })
  res.json({message: "signup done", userId: "user._id" })
})



userRouter.post("/signin", async(req,res)=>{

  const {email,password} = req.body;
  const user = await userModel.findOne({email})

  if(!user) return res.status(401).json({message:"invalid creds"})

    const ok = bcrypt.compare(password, user.password)
 if(!ok) return res.status(401).json({message:"invalid creds"})
  

  const payload = { id: user._id, email: user.email }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30m"})
    res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });
  res.json({ message: "logged in (jwt issued)" });
})




userRouter.get("/purchases", authware,(req,res)=>{
    res.json({ message: "These are your purchases"})
})



export default userRouter;