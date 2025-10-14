import express from 'express'
import userrouter from './userRouter';
import zod from 'zod'


const router = express.Router();





router.use("/user", userrouter)

export default router;