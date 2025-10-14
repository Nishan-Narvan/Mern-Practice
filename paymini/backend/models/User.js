import mongoose from "mongoose"

const { Schema,Model } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})



const User = mongoose.model("User", userSchema);

export default User;