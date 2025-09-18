import express from 'express'
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserModel } from './models.js'


const app = express();
dotenv.config();


const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
	throw new Error("MONGO_URL environment variable is not defined");
}
mongoose.connect(mongoUrl).then(() => console.log("MongoDB connected")).catch((err) => console.error("Error connecting MongoDB", err));


app.listen(3000,()=>console.log("Listening at port 3000"))



app.post("/api/v1/signup", async(req,res)=>{

	const {username, password} = req.body;

	await UserModel.create({

		username: username,
		password: password
	})
   
	 res.json({ message: "User signed up  "})


} )


app.post("/api/v1/signin", (req,res)=>{

    
} )



app.post("/api/v1/content", (req,res)=>{

    
} )



app.get("/api/v1/content", (req,res)=>{

    
} )

app.delete("/api/v1/content", (req,res)=>{

    
} )


app.post("/api/v1/brain/share", (req,res)=>{

    
} )



app.get("/api/v1/brain/:shareLink", (req,res)=>{

    
} )
