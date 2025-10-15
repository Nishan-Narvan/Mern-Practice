import mongoose from "mongoose"

const { Schema,Model } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})


const accountSchema = new Schema ({
    


userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
          },
balance:{
    type: Number,
    required: true

}


})


export const User = mongoose.model("User", userSchema);

export const Account = mongoose.model("Account", accountSchema);