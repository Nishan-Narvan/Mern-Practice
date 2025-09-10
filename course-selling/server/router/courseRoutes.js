import express from "express"
import userware from "../middlewares/usermiddleware.js"
import { courseModel, purchaseModel } from "../models/userSchema.js";


const courseRouter = express.Router();


courseRouter.post("/purchases",userware, async(req,res)=>{
    try{

  const userId = req.userId;
    const courseId = req.body.courseId

    if(!courseId) return res.status(400).json({ message:"CourseId is required"})


        const courseExists = await courseModel.findById(courseId);
        if(!courseExists) return res.status(404).json({message:"Course Not found"})
   
            const existingpurchase = await purchaseModel.findOne({ userId,courseId})


            if(existingpurchase) return res.status(400).json({ message:" You have already purchased this course"})
    
    
    
    
    
                await purchaseModel.create({

        userId,
        courseId
    })
 res.json({ message: " you have successfully bought the course"})

    }catch(err){
        res.json({ error: err.message})

    }

  
})



courseRouter.get("/preview", async (req, res) => {
  try {
    // Fetch all courses but maybe exclude internal fields like __v
    const courses = await courseModel.find({}).select("-__v");

    res.status(200).json({
      message: "Course preview endpoint",
      courses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default courseRouter