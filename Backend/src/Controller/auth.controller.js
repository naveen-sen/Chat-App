import bcrypt from "bcrypt";
import User from "../Model/user.model.js";
import { generateToken } from "../Services/authentication.js";
import cloudinary from "../Services/cloudinary.js";


export const signup = async (req,res)=>{
    const {fullname,email,password} = req.body;

    if(!fullname || !email || !password){
        return res.status(400).json({message:" all the fields are required"});
    }
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(6)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password:hashedPassword
        })

        if(newUser){

            const token =generateToken(newUser._id,res)
            
            await newUser.save()

            

            return res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic:newUser.profilePic,
                createdAt:newUser.createdAt,
                token
            })
        }
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const signin = async (req,res)=>{
    const {email,password} = req.body
    try{
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const isPassword = await bcrypt.compare(req.body.password,user.password);

        if(!isPassword){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = generateToken(user._id, res)

        return res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilePic:user.profilePic,
            createdAt:user.createdAt,
            token
        })
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
export const signout = (req,res)=>{
    res.clearCookie("jwt")
    return res.status(200).json({message:"Signed out successfully"})
}


export const updateProfile = async (req,res)=>{
    const {profilePic} = req.body;
    try{
        const userId = req.user._id
        if(!profilePic){
            res.status(400).json({message:"Profile picture is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateResponse = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
            res.status(200).json({message:"Profile updated successfully"});

        if(!updateResponse){
            return res.status(400).json({message:"Failed to update profile"})
    }

}catch(error){
    return res.status(500).json({message:error.message})
}
}


export const checkForAuthentication = (req,res)=>{
    try{
        return res.status(200).json(req.user)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}