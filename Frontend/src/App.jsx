import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"

import {Toaster} from "react-hot-toast"
import {Loader} from "lucide-react"

import {Routes,Route, Navigate} from "react-router-dom"

import { useAuthStore } from "./store/useAuthStore"
import { useThemeStore } from "./store/useThemeStore"


function App(){
  const {authUser,isCheckingAuth,checkAuth,onlineUsers} = useAuthStore();

  const {theme} = useThemeStore();

  console.log("Online Users",onlineUsers);
  

  useEffect(()=>{
    checkAuth();
    document.documentElement.setAttribute('data-theme', theme);

  },[checkAuth])
  
  if(isCheckingAuth && !authUser) return(
    <div className="flex justify-center items-center h-screen">
      <Loader className = "sticky top-0 -50 bg-base-200 animate-spin"/>
    </div>
  )
  
  return(
    <div chat-theme={theme} className="min-h-screen flex flex-col">
      <div className="flex justify-end items-center  pt-4 pr-1 bg-f4f4f5">
        <Navbar/>
      </div>

      
        <Routes>
          
          <Route path="/" element={authUser?<HomePage/>: <Navigate to = "/signin"/>}/>
          <Route path="/signup" element={!authUser?<SignupPage/> : <Navigate to = "/"/>}/>
          <Route path="/signin" element={!authUser?<SigninPage/>: <Navigate to = "/"/>}/>
          <Route path="/settings" element={authUser?<SettingPage/>: <Navigate to = "/signin"/>}/>
          <Route path="/profile" element={authUser?<ProfilePage/>: <Navigate to = "/signin"/>}/>
      </Routes>
        
        <Toaster />
    </div>
  )
}

export default App