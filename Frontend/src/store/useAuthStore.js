import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {create} from "zustand";
import {io} from "socket.io-client"

const BaseUrl = import.meta.env.MODE==="development" ?"http://localhost:3000" : "/"


export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isSigningIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers : [],
    socket:null,

    checkAuth:async()=>{
        set({isCheckingAuth:true});
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data});
            get().connectSocket()
        }catch(error){
            console.log("Error in checkAuth", error);
            
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signUp : async(data)=>{
        set({isSignUp:true});
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");

            get().connectSocket()
            
        }catch(error){
            console.log("Error in signUp", error.response?.data || error);
            toast.error(error.response.data.message);
        }finally{
            set({isSignUp:false});
        }
    },

    signout : async()=>{
        try{
            await axiosInstance.post("/auth/signout");
            set({authUser:null});
            toast.success("Signed out successfully");

            get().disconnectSocket()
        }catch(error){
            console.log(error);
            toast.error("Error in signing out");
        }
    },

    signin : async(data)=>{
        set({isSigningIn:true});
        try{
            const res = await axiosInstance.post("/auth/signin",data);
            set({authUser:res.data});
            toast.success("Signed in successfully");

            get().connectSocket()
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSigningIn:false});
        }
    },

    updateProfile :async (data) => {
        set({isUpdatingProfile:true})
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    },

    connectSocket : ()=>{
        const {authUser} = get();
        if (!authUser ||  get().socket?.connected) return;
        const socket = io(BaseUrl,{
            query:{
                userId: authUser._id,
            }
        })
        socket.connect();
        set({ socket: socket})

        socket.on("getOnlineUsers",(userId=>{
            set({onlineUsers: userId});
        }))
    },

    disconnectSocket : ()=>{
        const {socket} = get();
        if(get().socket?.connected) socket.disconnect();
    }
}))