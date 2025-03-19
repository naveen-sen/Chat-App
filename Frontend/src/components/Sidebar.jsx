import { Users, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './SidebarSkeleton';

export default function Sidebar() {
    const { getUsers, users, selectedUser, isUserLoading, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUserLoading) return <SidebarSkeleton />;

    // Filter users based on search
    const filteredUsers = users.filter(user => 
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className='h-full w-20 lg:w-80 bg-gray-900 border-r border-gray-700 flex flex-col transition-all duration-200'>
            {/* Header */}
            <div className='border-b border-blue-500 w-full p-5 flex items-center gap-3'>
                <Users className='size-6 text-gray-100' />
                <span className='font-medium text-gray-100 hidden lg:block'>
                    Contacts ({users.length})
                </span>
            </div>

            {/* Search Bar */}
            <div className='relative p-3 hidden lg:block'>
                <Search className='absolute left-4 top-4 w-5 h-8 text-gray-400' />
                <input
                    type='text'
                    placeholder='Search contacts...'
                    className='w-full bg-gray-800 text-gray-200 p-2 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-400'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* User List */}
            <div className='overflow-y-auto w-full py-3 custom-scrollbar'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3 transition-all rounded-lg ${
                                selectedUser?._id === user._id 
                                ? 'bg-[#162a4d] text-white shadow-lg'
                                : 'hover:bg-gray-800 text-gray-300'
                            }`}
                        >
                            <div className='relative mx-auto lg:mx-0'>
                                <img 
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.fullname}
                                    className='w-12 h-12 rounded-full object-cover border-2 border-gray-700'
                                />
                                {onlineUsers?.includes(user._id) && (
                                    <div className='absolute bottom-1 right-1 w-3 h-3 bg-green-500 ring-2 ring-gray-900 rounded-full'/>
                                )}
                            </div>
                            
                            <div className='hidden lg:block text-left min-w-0'>
                                <div className='font-medium text-sm truncate'>
                                    {user.fullname}
                                </div>
                                <div className={`text-xs ${onlineUsers?.includes(user._id) ? 'text-green-400' : 'text-gray-500'}`}>
                                    {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-5">No contacts found</p>
                )}
            </div>
        </aside>
    );
}
