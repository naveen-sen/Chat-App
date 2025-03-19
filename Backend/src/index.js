import express from "express";
import  authRouter  from "./Routes/auth.router.js";
import messageRouter from "./Routes/message.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./Services/socket.js"
import dotenv from "dotenv"
import {connectDB} from "./Services/db.js"
import path from "path"

dotenv.config()
const PORT = process.env.PORT || 3000 ;
const _dirname = path.resolve();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true , limit:"50mb"}));
app.use(express.json({limit:"50mb"}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"../Frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../Frontend","dist","index.html"))
    })
}


server.listen(PORT, () =>{ console.log(`Server started on port ${PORT}` );
connectDB()});