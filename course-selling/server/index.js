import express from 'express'
import userRouter from "./router/userRoutes.js"
import courseRouter from  "./router/courseRoutes.js"
import adminrouter from "./router/adminrouter.js"

const app =express();


app.get("/", (req,res)=>{

    res.status(200).json({message:"thisis   you data"})
})



app.use("/user", userRouter)
app.use("/courses", courseRouter)
app.use("/admin", adminrouter)

app.listen(3000, ()=>console.log("server started") ) 