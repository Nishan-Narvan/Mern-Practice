import mongoose, { Schema } from "mongoose";

const mySchema = new Schema ({
  username: { 
    type: String, 
    required: true, 
    unique: true, // prevent duplicate usernames
    trim: true,   // remove extra spaces
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });


const contentSchema = new Schema({
    title: {type:String,
      required: true
    },
     desc: {type: String},
    link: {type:String,
      required: true
    },
    tags: [{ type: mongoose.Types.ObjectId,  ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId  , ref: 'User', required: true}
})

const LinkSchema = new Schema({

  hash: {type: String, required: true, unique: true },
  userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
},{timestamps: true})

const TagS = new Schema({
  name: { type: String, required: true},
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true}
})


// Correct way to create a model
export const UserModel = mongoose.model("User", mySchema);

export const ContentModel = mongoose.model("Content", contentSchema)

export const LinkModel = mongoose.model("Links", LinkSchema);

export const TagModel = mongoose.model("Tags", TagS)