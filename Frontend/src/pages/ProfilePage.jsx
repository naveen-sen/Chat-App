import {React,useState} from 'react'
import {useAuthStore} from "../store/useAuthStore";
import { Camera, Mail, User } from 'lucide-react';

function ProfilePage() {
  const {authUser,isUpdatingProfile,updateProfile} = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const maxSize = 5*1024*1024;
    if(file.size > maxSize){
      toast.error("File size exceeds the 5MB limit");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async ()=>{
      const base64Image = reader.result
      setSelectedImage(base64Image);
      await updateProfile({profilePic:base64Image})
    }
  }
  return (
    <div className='h-full pt-20 bg-gray-900/90 text-white flex items-center justify-center'>
      <div className='max-w-2xl w-full mx-auto py-8 px-6 bg-[#162a4d] rounded-2xl shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-white'>Profile</h1>
          <p className='text-gray-300'>Manage your profile</p>
        </div>

        {/*Avatar Upload Section */}
        <div className='flex flex-col items-center gap-4 mt-6'>
          <div className='relative'>
            <img
              src={selectedImage ||authUser.profilePic || '/avatar.png'}
              alt='profile'
              className='w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-md'
            />
            <label
              htmlFor='avatar-upload'
              className={`absolute right-0 bottom-0 bg-blue-500 rounded-full p-2 cursor-pointer
              hover:scale-105 transition-all duration-200 shadow-lg
              ${isUpdatingProfile ? "animate-ping pointer-events-none" : ""}`
            }
            >
              <Camera className='w-5 h-5 text-white'/>
              <input
                type='file'
                id='avatar-upload'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className='text-sm text-gray-400'>
            {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to upload a new profile picture'}
          </p>
        </div>

        <div className='space-y-6 mt-6'>
          <div className='space-y-1.5'>
            <div className='text-sm text-gray-400 flex items-center gap-2'>
              <User className='w-5 h-5 text-blue-300'/>
              <span>Full Name</span>
            </div>
            <p className='px-4 py-2.5 bg-[#25385e] rounded-lg border border-gray-500 text-white'>{authUser.fullname}</p>
          </div>

          <div className='space-y-1.5'>
            <div className='text-sm text-gray-400 flex items-center gap-2'>
              <Mail className='w-5 h-5 text-blue-300'/>
              <span>Email</span>
            </div>
            <p className='px-4 py-2.5 bg-[#25385e] rounded-lg border border-gray-500 text-white'>{authUser.email}</p>
          </div>
        </div>

        <div className='mt-6 bg-[#1b2e4a] rounded-xl p-6 border border-gray-600'>
          <h2 className='text-lg font-medium text-white mb-4'>Account Information</h2>
          <div className='flex items-center justify-between py-2 border-b border-gray-700 text-gray-300'>
            <span>Joined on</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className='flex items-center justify-between py-2 text-gray-300'>
            <span>Account Status</span>
            <span className='text-green-400'>Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
