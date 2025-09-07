import express from "express"

const admin= express.Router();

admin.post("/signup", (req,res)=>{
    res.json({ message: "this is admin endpoint"}


    )
})


admin.post("/signin", (req,res )=> {

    res.json({ message: "this is your sign in endpoint"})
})




export default admin