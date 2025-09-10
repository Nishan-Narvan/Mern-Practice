import express from "express"
import { adminModel, courseModel} from "../models/userSchema.js";
import jwt from  "jsonwebtoken"
import authware from "../middlewares/auth.js";
import dotenv from "dotenv"



const admin= express.Router();

admin.post("/signup", async (req,res)=>{
    try{
     
        const {email, password, firstName, lastName} = req.body;

    const user= await adminModel.create({

        email,
        password,
        firstName,
        lastName
    })
    res.json({ message: "this is signup endpoint", user}


    )

    }catch(err){


         res.status(400).json({ error: err.message });


    }
    
   

    
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

        }, process.env.JWT_ADMIN_PASSWORD);

        res.json({ token: token, message: " sign in successfull" })
    }else{
    res.json({ message: "invalid credentials"})  }
})


admin.post("/coursescreation",authware, async (req,res)=>{


    const adminId = req.userId;
    const {title,description,price,imageUrl} = req.body;
    
    const course = await courseModel.create({
      title,description,price,imageUrl,createdId: adminId

    })

    res.status(200).json({message:"this is my protected route, course created", course: course._id})
})

admin.put("/course", authware, async (req, res) => {
    const adminId = req.user.id; // make sure authware sets req.user.id
    const { title, description, price, imageUrl, courseId } = req.body;

    const updatedCourse = await courseModel.findOneAndUpdate(
        { _id: courseId, createdId: adminId }, // only allow creator
        { title, description, price, imageUrl },
        { new: true } // return the updated document
    );

    if (!updatedCourse) {
        return res.status(403).json({ message: "You are not the creator of this course or course not found" });
    }

    res.json({ message: "Course updated", course: updatedCourse });
});



admin.get("/mycourses", authware,async(req,res)=>{

    const adminId = req.userId

    const courses = await courseModel.find({
      createdId: adminId
    })

    res.json({

        
        mycourses:courses
    })
})


export default admin


