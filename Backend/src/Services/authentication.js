import jwt from "jsonwebtoken";
import {config} from "dotenv"


config();


export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.SECRET,{
        expiresIn:"10d"
    })

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:10*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development",
    })
    return token;
}

export function validateToken(token){
    const payload = jwt.verify(token,process.env.SECRET);
    return payload;
}



