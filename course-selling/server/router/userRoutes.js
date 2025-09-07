import express from 'express'

const userRouter = express.Router()
// I always forget how to init the router


userRouter.get("/", (req,res)=>{
  res.json({message: "get req endpoint"})
})




 
userRouter.post("/signup", (req,res)=>{
  res.json({message: "signup endpoint"})
})



userRouter.post("/signin", (req,res)=>{
    res.json({message: "signin endpoint"})
})




userRouter.get("/purchases", (req,res)=>{
    res.json({ message: "These are your purchases"})
})



export default userRouter;