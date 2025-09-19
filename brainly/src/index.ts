import express from 'express'
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ContentModel, UserModel, LinkModel } from './models.js'
import { userMiddleware } from './middleware.js'
import { random } from './utils.js'


const app = express();
app.use(express.json());
dotenv.config();


const JWT_SECRET = "12345"

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
	throw new Error("MONGO_URL environment variable is not defined");
}
mongoose.connect(mongoUrl).then(() => console.log("MongoDB connected")).catch((err) => console.error("Error connecting MongoDB", err));


app.listen(3000,()=>console.log("Listening at port 3000"))



app.post("/api/v1/signup", async(req,res)=>{

try{	const {username, password} = req.body;

	await UserModel.create({

		username: username,
		password: password
	})
   
	 res.json({ message: "User signed up  "})
}catch(err){
	console.log("error occured", err)
}

} )


app.post("/api/v1/signin", async(req,res)=>{


	try{
		
		const {username, password} = req.body;
		const existingUser = await UserModel.findOne({

			username, password
		})

		if (existingUser){
			const token = jwt.sign({ 
				id: existingUser._id}, JWT_SECRET)


				res.json({  token})
		}else{
			res.status(400).json({ 
				message:"Incorrect credentials"
			})
		}

     }catch(err){


	 }

    
} )



app.post("/api/v1/content",userMiddleware, async (req,res)=>{


	const {link,type} = req.body;
	await ContentModel.create({
		link,
		type,
		//@ts-ignore
		userId: req.userId,
		tags:[]
	})


	return res.json({
		message: "Content added"
	})
    
} )



app.get("/api/v1/content", (req,res)=>{

    
} )

app.delete("/api/v1/content", (req,res)=>{

    
} )


app.post("/api/v1/brain/share",userMiddleware, async (req,res)=>{

	const {share}= req.body;
	if(share){
		await LinkModel.create({
			//@ts-ignore
			userId: req.userId,
			hash: random(10)
		})
	}else{
		await  LinkModel.deleteOne({
			//@ts-ignore
			userId: req.userId
		})
	}

	res.json({
		message: "Updated sharable link"
	})


    
} )



app.get("/api/v1/brain/:shareLink", async(req,res)=>{
 

	const hash = req.params.shareLink;
	const link = await LinkModel.findOne({
		hash
	})

	if(!link){
		res.status(411).json({
			message: "sorry incorrect input"
		})
		return;
	}

	const content = await ContentModel.find({
		userId: link.userId
	})
	const user = await UserModel.findOne({
		userId: link.userId
	})
    res.json({
		username: user?.username,
		content: content
	})
} )
