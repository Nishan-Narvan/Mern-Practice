import express from 'express'
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


const app = express();
dotenv.config();


const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
	throw new Error("MONGO_URL environment variable is not defined");
}
mongoose.connect(mongoUrl).then(() => console.log("MongoDB connected")).catch((err) => console.error("Error connecting MongoDB", err));



app.post("/api/v1/signup", (req,res)=>{


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
