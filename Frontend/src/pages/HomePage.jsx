import React from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/Sidebar'

function HomePage() {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-accent bg-gray-900/90'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-[#e5e7eb] rounded-lg shadow-2xs w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar/>
            {!selectedUser?<NoChatSelected/>:<ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage