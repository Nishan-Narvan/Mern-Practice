import express from "express"


const app = express();

app.get("/signup", (req,res)=>{
    res.send("Hello World");
})

app.get("/signin", (req,res)=>{
    res.send("Hello world")
})

app.get("/chat", (req,res)=>{

    res.send("Hello this is chat")
})

app.listen(3001,()=>{
    console.log("This is the backend server")
})