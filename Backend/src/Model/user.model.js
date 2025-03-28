import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    }
    
    },
    {timestamps:true}
)

const User = mongoose.model("User",userSchema)
export default User
    
