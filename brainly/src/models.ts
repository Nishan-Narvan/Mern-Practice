import {Model, Schema} from "mongoose"


const  mySchema = new Schema({
    username: {type: String, unique: true},
    password: String
})


export const UserModel = new Model(mySchema, "User")