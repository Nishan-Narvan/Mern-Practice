import express from 'express'
import userRouter from "./router/userRoutes.js"
import courseRouter from  "./router/courseRoutes.js"
import adminrouter from "./router/adminrouter.js"
import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config();

const app =express();
app.use(express.json())

app.get("/", (req,res)=>{

    res.status(200).json({message:"thisis   you data"})
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL
      
    );
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1); // optional: exit app if DB fails
  }
};

await connectDB();



app.use("/user", userRouter)
app.use("/courses", courseRouter)
app.use("/admin", adminrouter)

app.listen(3000, ()=>console.log("server started") ) 