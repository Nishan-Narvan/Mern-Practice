import express from 'express'
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { ContentModel, UserModel, LinkModel, TagModel } from './models.js'
import { userMiddleware } from './middleware.js'
import { random } from './utils.js'
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();


const JWT_SECRET = "12345"

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
	throw new Error("MONGO_URL environment variable is not defined");
}
mongoose.connect(mongoUrl).then(() => console.log("MongoDB connected")).catch((err) => console.error("Error connecting MongoDB", err));


app.listen(3000,()=>console.log("Listening at port 3000"))



app.post("/api/v1/signup", async(req,res)=>{

try{	
	
	
	
	const {username, password} = req.body;
     
	 if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

	const existingUser = await UserModel.findOne({ username });
   
	if (existingUser) {
	  return res.status(400).json({ message: "User already exists" });
	}

	const hashedPass = await bcrypt.hash(password, 10)
	await UserModel.create({

		username: username,
		password: hashedPass
	})
   
	 res.json({ message: "User signed up  "})
}catch(err){
	 console.error("Signup error ❌", err);
    return res.status(500).json({ message: "Server error, please try again." })
}

} )


app.post("/api/v1/signin", async(req,res)=>{


	try{
		
		const {username, password} = req.body;
      
		if(!username || !password){
			return res.status(400).json({message: "Username and password are required"})

		}

		const existingUser = await UserModel.findOne({

			username
		})

		if (!existingUser){
				return res.json({ message: "User not found, sign up before please" })  }

//  We took usename and pass from req----checked if username exists ---else----we compare pass with indb pass----if valid----we sign the token using db id  and jwt and send token in res

		if (!existingUser.password) {
			return res.status(400).json({ message: "User password not set" });
		}
		const isPassvalid = await bcrypt.compare(password, existingUser.password);


		if(!isPassvalid) return res.status(400).json({ message: "Invalid credentials"})
        

			const token = jwt.sign({id: existingUser._id}, JWT_SECRET, {
      expiresIn: "1h",
    })

	res.json({ token, message:"You are signed in"})
		}

     catch(err){
        console.error("Signin error:", err);
    res.status(500).json({ message: "Internal server error" });

	 }

    
} )



app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { title, desc, link, tags } = req.body; // tags = array of tag IDs

    if (!title || !link) {
      return res.status(400).json({ message: "Title and link are required" });
    }

    const content = await ContentModel.create({
      title,
      desc,
      link,
      tags,           // array of ObjectIds
	  //@ts-ignore
      userId: req.userId
    });

    // Optionally populate tags to return full tag info
    await content.populate("tags");

    res.status(201).json({ message: "Content created", content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const content = await ContentModel.find({ 
		//@ts-ignore
		userId: req.userId })
      .populate("tags")          // populate tags
      .populate("userId", "username"); // optional: include username

    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const result = await ContentModel.deleteMany({
		//@ts-ignore
      userId: req.userId
    });

    // result contains info about deletion
    res.json({ message: "Content deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/api/v1/brain/share",userMiddleware, async (req,res)=>{


	try{

	const {share}= req.body;
	if(share){
    

		// @ts-ignore
		let existing = await LinkModel.findOne({ userId: req.userId})
		
		
	     	if(!existing){
	     		const existing =  await LinkModel.create({
	     		//@ts-ignore
	     		userId: req.userId,
	     		hash: random(10)
	     	
	     	
	     	})

			return res.json({ 
				message: "Sharable link enabled",
				link: `http://localhost:3000/api/v1/brain/${existing.hash}`

				//giving user the endpoint ehich could get them content
			})
	     }
	}else{
		await  LinkModel.deleteMany({
			//@ts-ignore
			userId: req.userId
		})
	}

	res.json({
		message: "Updated sharable link"
	})


    }catch(err){
		console.log(err);
		res.status(500).json({ message: "Server error"})
	}
} )



app.get("/api/v1/brain/:shareLink", async(req,res)=>{
 
 try{
	const hash = req.params.shareLink;
	const link = await LinkModel.findOne({
		hash
	})

	if(!link){
		res.status(404).json({
			message: "sorry no sharable link"
		})
		return;
	}

	const content = await ContentModel.find({
		userId: link.userId
	}).populate("tags")
	const user = await UserModel.findById(link.userId);

    return res.json({
		sharedbyuser: user?.username,
		content: content
	})

	}catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
} )


app.get("/api/v1/tags", userMiddleware, async (req, res) => {
	// @ts-ignore
	const tags = await TagModel.find({ userId: req.userId });
	res.json({ tags });
});

app.post("/api/v1/tags", userMiddleware, async (req,res)=>{
  const { name } = req.body;
  if(!name) return res.status(400).json({ message: "Tag name required" });
  // @ts-ignore
  const existing = await TagModel.findOne({ name, userId: req.userId });
  if(existing) return res.status(400).json({ message: "Tag exists" });
  // @ts-ignore
  const tag = await TagModel.create({ name, userId: req.userId });
  res.status(201).json({ tag });
});

app.delete("/api/v1/tags/:id", userMiddleware, async (req, res) => {
	try{
	const id= req.params.id;
	//@ts-ignore
	const userId = req.userId;


	const tag = await TagModel.findOne({_id: id, userId})
  
	  if (!tag) {
      return res.status(404).json({ message: "Tag not found or unauthorized" });
    }
   

	 await TagModel.deleteOne({ _id: id, userId });

    res.json({ message: "Tag deleted successfully", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete tag" });
  }

})