import Message from "../Model/message.model.js";
import User from "../Model/user.model.js";
import cloudinary from "../Services/cloudinary.js";
import {getReceiverSocketId,io} from "../Services/socket.js";
export const getUserForSidebar = async (req,res)=>{
    try{
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password");

        res.status(200).json(filteredUser)
    }catch(error){
        console.log("Error in getUserForSidebar", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id:userToChat} = req.params
        const senderId = req.user._id

    const message = await Message.find({
        $or:[
            {senderId:senderId, receiverId:userToChat},
            {senderId:userToChat, receiverId:senderId}
        ]
    })

    res.status(200).json(message)
    }catch(error){
        res.status(500).json({error:"Internal Server Error "})
    }
}

export const sendMessage = async (req, res) => {
    try {
        
        const { text, image } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.user._id;
        

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        
            await newMessage.save();
            
            const receiverSocketId = getReceiverSocketId(receiverId);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage);
            }

            res.status(201).json(newMessage);
            
        
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}