import express from "express";
import zod from "zod";
import { User, Account } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authmiddleware from "../Middlewares/auth.js";
const userrouter = express.Router();

const signupSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

userrouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  try {
    const { email, password, firstName, lastName } = req.body;

    const exist = await User.findOne({
      email: email,
    });
    if (exist) {
      return res.json({
        message: "User alreay exists, please sign in",
      });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedpass,
      firstName,
      lastName,
    });

    const userId = user._id;

    const createdacc = await Account.create({
      userId: userId,
      balance: 1 + Math.random() * 1000,
    });

    return res.json({
      message: "User successfully created",
      user: user,
      created: createdacc,
    });
  } catch (err) {
    console.error(`the error id ${err}`);
  }
});

const JWT_KEY = "nishan123";

userrouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.json({
        message: "Invalid credentials",
      });
    }
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_KEY, {
      expiresIn: "1h",
    });

    return res.json({
      message: "You are signed in ",
      token: token,
    });
  } catch (err) {
    console.error(`the error id ${err}`);
  }
});

userrouter.get("/bulk",authmiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 

   const skip= (page - 1)*limit

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    }).skip(skip).limit(limit)
    ;

    res.json({
      users: users.map((user) => ({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.get("/me", authmiddleware,async(req,res)=>{

   try {
    const user = await User.findById(req.userId).select("firstName lastName email");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user details" });
  }
})


userrouter.get("/:id", authmiddleware, async (req, res) => {
  try {
        console.log("Params received:", req.params);

    const user = await User.findById(req.params.id).select("firstName lastName ");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipient info" });
  }
});


export default userrouter;
