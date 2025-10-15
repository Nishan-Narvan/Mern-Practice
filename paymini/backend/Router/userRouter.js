import express from 'express'
import zod from 'zod'
import { User,Account } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userrouter = express.Router();



const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})


userrouter.post("/signup", async (req, res)=>{

    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success) {
        return res.json({
            message: "Incorrect inputs"
        })
    } 
  
    try{

        const {username, password,firstName, lastName} = req.body;

        const exist =await User.findOne({
            username: username
        })
        if(exist){
            return res.json({
                message:"User alreay exists, please sign in"
            })
        }
            
        const hashedpass = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            password: hashedpass,
            firstName,
            lastName
        })


         const userId = user._id 

        const createdacc=await Account.create({

            userId: userId,
            balance: 1+ Math.random()*1000
        })

        return res.json({
            message: "User successfully created", user: user, created: createdacc
        }) 
    }catch(err){
     
        console.error(`the error id ${err}`)

    }


})





const JWT_KEY= "nishan123"


userrouter.post("/signin", async(req, res)=>{

    try{


        const {username, password} = req.body;

        const user = await User.findOne({
            username
        })

        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            return res.json({
                message: "Invalid credentials"
            })

        }
             const userId = user._id 
       
        const token = jwt.sign({ userId }, JWT_KEY, {
            expiresIn: "1h"
        })

        return res.json({
            message: "You are signed in ", token: token
        })
    }catch(err){
          console.error(`the error id ${err}`)

    }
})


export default userrouter