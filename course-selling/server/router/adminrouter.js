import express from "express"
import { adminModel} from "../models/userSchema.js";
import jwt from  "jsonwebtoken"
import authware from "../middlewares/auth.js";
const  JWT_USER_PASSWORD = "adam22"


const admin= express.Router();

admin.post("/signup", async (req,res)=>{


    const {email, password, firstName, lastName} = req.body;

    const user= await adminModel.create({

        email,
        password,
        firstName,
        lastName
    })
    res.json({ message: "this is signup endpoint", user}


    )
})


admin.post("/signin", async (req,res )=> {

    const { email,password} = req.body;
    const user = await adminModel.findOne({

        email: email,
        password: password
    })
   
    if(user){
     
        const token= jwt.sign({
            id: user._id

        }, JWT_USER_PASSWORD);

        res.json({ token: token, message: " sign in successfull" })
    }else{
    res.json({ message: "invalid credentials"})  }
})


admin.get("/protected",authware, (req,res)=>{
    res.status(200).json({message:"this is my protected route"})
})


export default admin