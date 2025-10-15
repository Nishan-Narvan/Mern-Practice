import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Account } from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import authMiddleware from './Middlewares/auth.js'
import router from './Router/router1.js';
import cors from 'cors'
const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());



async function db() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}
db();


app.listen(3000,()=>{
    console.log("server started")
})
app



app.get("/", authMiddleware, async (req, res) => {
    try {
        // Optionally, you can send user info if needed
        res.json({ message: "Hello from this endpoint", user: req.user });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});



app.use("/api/v1", router)