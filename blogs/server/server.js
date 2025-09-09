import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app= express();
app.use(express.json())


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongodb atlas"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

app.get('/', (req, res) => {

    res.status(200).json("This is your data")

})

app.use("/api/blogs", blogRoutes)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("Hey my server started at port",PORT)
})