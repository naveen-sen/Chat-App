import React from 'react'
import { X } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'

function ChatHeader() {
  const {selectedUser, setSelectedUser } = useChatStore()
  const {onlineUsers} = useAuthStore()
  return (
    <div className='p-3 border-b border-[#d1d5db]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/** Avatar */}
          <div className='avatar'>
            <div className='size-10 rounded-full relative'>
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullname} className='w-full h-full object-cover rounded-full'/>
            </div>
          </div>

          {/** User Info */}
          <div>
            <h3 className='font-medium'>{selectedUser.fullname}</h3>
            <p className='text-xs text-gray-500'>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
      </div>
      {/* Close Button */}
      <button onClick={() => setSelectedUser(null)} className='flex items-center gap-2 text-red-400 hover:text-red-800'>
        <X size={30} className='fill-current'/>
      </button>
    </div>
  </div>
  )
}

export default ChatHeader