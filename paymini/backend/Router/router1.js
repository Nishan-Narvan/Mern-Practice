import express from 'express'
import userrouter from './userRouter.js';
import accountrouter from './accountrouter.js'
import zod from 'zod'


const router = express.Router();





router.use("/user", userrouter)
router.use("/account",accountrouter)

export default router;