import { Image, Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';
import {useAuthStore} from '../store/useAuthStore';


const MessageInput = () => {
    const [text,setText] = useState("");
    const [imagePreview,setImagePreview] = useState(null)
    const fileInputRef = useRef(null);
    const { sendMessage,selectedUser } = useChatStore()
    const {authUser} = useAuthStore();
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        if(!file.type.startsWith("image/")){
          toast.error("Please select an image file");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const removeImage = ()=>{
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage = async(e)=>{
      e.preventDefault();
      if(!text.trim() && !imagePreview) return

      try{
        await sendMessage({
          text: text.trim(),
          image: imagePreview,
        })

        setText("");
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
      }catch(error){
        console.log("Failed to send message",error);
        
      }
    }
  return (
    
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-3'>
          <div className='relative w-40 h-40'>
            <img src={imagePreview} alt='preview' className='w-40 h-40 rounded-lg border border-zinc-700'/>
            <button onClick={removeImage} className='absolute top-0 right-0 w-6 h-6 bg-zinc-700 text-zinc-50 rounded-full flex items-center justify-center'
            type="button">
              <X size={20}/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
        <div className='flex flex-1 gap-3'>
          <input
            type='text'
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder='Type a message...'
            className='flex-1 p-3 bg-zinc-700 text-zinc-50 rounded-xl outline-none'
          />
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />

          <button className={`hidden sm:flex w-15 h-15 rounded-full justify-center items-center ${imagePreview ? 'bg-emerald-500 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-auto'}`}
          onClick={()=>fileInputRef.current.click()} type='button'>
            <Image size={30}/>
          </button>
          <button 
            type="submit" 
            className={`flex items-center justify-center w-15 h-15 rounded-full
                ${(!text.trim() && !imagePreview) 
                    ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed opacity-50' 
                    : 'bg-zinc-700 text-zinc-400 hover:bg-emerald-700'
                } transition-colors`}
            disabled={!text.trim() && !imagePreview}
          >
              <Send size={35}/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput;
