import mongoose, { Schema } from "mongoose";

const mySchema = new Schema({
  username: { type: String },
  password: String,
});


const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId,  ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId  , ref: 'User', required: true}
})

const LinkSchema = new Schema({

  hash: String,
  userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})


// Correct way to create a model
export const UserModel = mongoose.model("User", mySchema);

export const ContentModel = mongoose.model("Content", contentSchema)

export const LinkModel = mongoose.model("Links", LinkSchema);
