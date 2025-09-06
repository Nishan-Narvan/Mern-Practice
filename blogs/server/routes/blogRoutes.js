import express from 'express'
import Blog from "../models/blogModel.js";



const router = express.Router();

router.post("/", async (req, res)=>{
    try{
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);

    }catch(err){
        res.status(400).json({error: err.message});
    }
})

router.get("/",async (req,res)=>{
    try{
        const blogs = await Blog.find();
        res.status(200).json(blogs);

    }catch(err){
        res.status(500).json({ message:`Error is ${err}`})
    }})


router.get("/:id", async(req, res)=>{

    try{

    const blog =await Blog.findById(req.parama.id)
    if( !blog) return res.status(404).json({ message:"Blog not found"})
        res.status(200).json(blog) 

    }catch(err){
        res.status(500).json({ message:`The error is ${err}`})

    }
})

router.put("/:id", async(req, res)=>{
    try{
        const {title, content} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,{ title,content},{new: true}
        )

        if (!updatedBlog){
            return res.status(404).json({ message:"Blog not found"})
        }

        res.status(200).json(updatedBlog);



    }catch(err){
        console.error("The error is ", err)

    }
})



router.delete("/:id", async(req, res)=>{
    try{
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
        if(!deleteBlog) return res.status(404).json({ message: "Blog not found"})

        res.status(200).json({ message:"Blog deleted successfully"})
    }catch(err){console.error("The error is", err)}
})



export default router