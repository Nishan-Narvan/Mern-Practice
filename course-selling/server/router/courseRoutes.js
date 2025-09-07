import express from "express"


const courseRouter = express.Router();


courseRouter.post("/purchases", (req,res)=>{
 res.json({ message: " signup endpoint"})
})



courseRouter.get("/preview", (req,res)=>{
 res.json({ message: " course preview endpoint"})
})



export default courseRouter