import React, { useEffect, useRef } from 'react';
import { formatMessageTime } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';

export default function ChatContainer() {
  const { messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if(messagesEndRef.current && messages){
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })};
  }, [messages]);

  useEffect(() => {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return()=> unsubscribeFromMessages();
  }, [getMessages, selectedUser?._id, subscribeToMessages, unsubscribeFromMessages]);

  if (isMessageLoading) {
    return (
      <div className='flex-1 flex flex-col h-full bg-gray-900 text-gray-300'>
        <ChatHeader />
        <MessageSkeleton />
        <div className='mt-auto'>
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col h-full bg-gray-900 text-gray-300'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar'>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end gap-2 transition-all duration-300 ${
              message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Profile Picture */}
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 rounded-full border-2 border-gray-700 overflow-hidden'>
                <img
                  src={
                    message.senderId === authUser?._id 
                      ? authUser?.profilePic || "/avatar.png" 
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt='profile pic'
                  className='w-full h-full object-cover'
                  onError={(e) => { e.target.src = "/avatar.png"; }}
                />
              </div>
            </div>

            {/* Message Content */}
            <div className={`flex flex-col max-w-[70%] ${
              message.senderId === authUser._id ? "items-end" : "items-start"
            }`}>
              <time className='text-xs text-gray-500 mb-1'>
                {formatMessageTime(message.createdAt)}
              </time>

              <div className={`rounded-2xl p-3 shadow-lg transition-opacity ${
                message.senderId === authUser._id 
                  ? "bg-gray-950 text-white rounded-br-none ml-auto"
                  : "bg-gray-800 text-gray-200 rounded-bl-none mr-auto"
              }`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt='Attachment'
                    className='max-w-[200px] rounded-md mb-2 hover:opacity-90 transition-opacity cursor-pointer'
                    onClick={() => window.open(message.image, '_blank')}
                  />
                )}
                {message.text && (
                  <p className='break-words'>{message.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='mt-auto border-t border-gray-700 bg-gray-800 p-2'>
        <MessageInput />
      </div>
    </div>
  );
}
