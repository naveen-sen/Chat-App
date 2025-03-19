import jwt from "jsonwebtoken";

const secret = "hbvcvzkjc21684@#bvsjchgv"


export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},secret,{
        expiresIn:"10d"
    })

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:10*24*60*60*1000,
        sameSite:"strict",
    })
    return token;
}

export function validateToken(token){
    const payload = jwt.verify(token,secret);
    return payload;
}



