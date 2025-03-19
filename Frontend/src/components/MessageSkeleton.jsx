import React from 'react';

function MessageSkeleton() {
    const skeletonMessages = Array(6).fill(null);
    
    return (
        <div className='flex-1 flex flex-col p-4 space-y-6 overflow-y-auto'>
            {skeletonMessages.map((_, index) => (
                <div 
                    key={index} 
                    className={`chat ${index % 2 === 0 ? 'chat-end justify-end' : 'chat-start justify-start'}`}
                >
                    <div className={`flex items-center gap-2 mb-1 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className='chat-image avatar'>
                            <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'/>
                        </div>
                        <div className='chat-header'>
                            <div className='h-4 w-16 bg-gray-200 animate-pulse rounded'/>
                        </div>
                    </div>
                    
                    <div className={`chat-bubble ${
                        index % 2 === 0 
                            ? 'bg-blue-100 ml-auto w-[45%]' 
                            : 'bg-gray-200 mr-auto w-[45%]'
                    } min-h-[40px] animate-pulse rounded-xl` }>
                    </div>
                    
                    <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center mt-1
                        ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className='h-3 w-12 bg-gray-200 animate-pulse rounded'/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MessageSkeleton