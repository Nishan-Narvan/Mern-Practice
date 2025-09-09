import  mongoose from 'mongoose'
console.log("Mongodb line ran")




const Schema =mongoose.Schema


const userSchema = new Schema({ 
email:{
    type: String,
    unique: true
}, 
password:{
      type: String,
},
firstName:{  type: String,},
 lastName:{  type: String,}


})

const adminSchema = new Schema({ 

    
email:{
    type: String,
    unique: true
}, 
password:{
      type: String,
},
firstName:{  type: String,},
 lastName:{  type: String,}


    
})

const courseSchema = new Schema({ 

title: { type: String},
description:{ type: String},
price: { type: Number},
imageUrl: { type: String},
createdId: { type: mongoose.Schema.Types.ObjectId }

})



const purchaseSchema = new Schema({

   userId: { type: mongoose.Schema.Types.ObjectId },
courseId: { type: mongoose.Schema.Types.ObjectId }

})


const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)



export { userModel, adminModel,courseModel,purchaseModel}