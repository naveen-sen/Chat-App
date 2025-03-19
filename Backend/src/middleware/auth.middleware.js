import jwt from "jsonwebtoken";
import { validateToken } from "../Services/authentication.js";
import  User  from "../Model/user.model.js";


export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies?.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const payload  = validateToken(token)
        if(!payload){
            return res.status(401).json({message:"Unauthorized"});
        }

        const user = await User.findById(payload.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"User Not Found"});
        }

        req.user = user;
        next();

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}