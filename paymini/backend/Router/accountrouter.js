import express from 'express'
import authmiddleware from '../Middlewares/auth.js';
import { Account } from '../models/User.js';
import mongoose from 'mongoose';


const accountrouter = express.Router();




accountrouter.get("/balance",authmiddleware,async(req,res)=>{
    try{
        
        const account = await Account.findOne({
            userId: req.userId
        })

        
             
        res.json({

            balance:account.balance
        })
        
    }catch(err){
        console.log(`The error is ${err}`)
    }
})


accountrouter.post('/transfer', authmiddleware, async(req,res)=>{
     const mysess= await mongoose.startSession();
    try{
        

       

           mysess.startTransaction();

        const {amount,toaccountid} = req.body;

        const account = await Account.findOne({
            userId: req.userId
        }).session(mysess)

        if(!account || account.balance < amount ){
             await mysess.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
        }

        const toaccount = await Account.findOne({
            userId: toaccountid
        }).session(mysess) 


        if(!toaccount){
            await mysess.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
        }

        await Account.updateOne({userId: req.userId},{ $inc:{balance: -amount}}).session(mysess)
        await Account.updateOne({userId: toaccountid},{$inc:{balance: amount}}).session(mysess)

        await mysess.commitTransaction()
        res.json({
            message: "Transfer successful"
        });

    } catch(err) {
        await mysess.abortTransaction();
        console.log(`The error is ${err}`)
        res.status(500).json({
            message: "Transfer failed"
        });
    } finally {
        // Always end the session
        mysess.endSession();
    }
})

export default accountrouter;