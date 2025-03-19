import {Users} from 'lucide-react'

const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null);
    return(
        <aside className='h-full w-full lg:w-72 bg-[#f4f4f7] border-r flex flex-col transition-all duration-200'>
            {/* Sidebar Header */}
            <div border-b border-base-300 w-full p-5>
                <div className='flex items-center gap-3'>
                    <Users className='w-6 h-6 text-primary'/>
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
            </div>

            {/* Sidebar Contacts */}
            <div className='overflow-y-auto w-full py-3'>
                {skeletonContacts.map((_,index)=>{
                    <div key={index} className='w-full p-3 flex items-center gap-3'>
                        {/* Avatar */}
                        <div className='relative mx-auto lg:mx-0'>
                            <div className='skeleton w-10 h-10 rounded-full'>
                            </div>
                        </div>

                        {/*User Info skeleton*/}
                        <div className='hidden lg:block text-left min-w-0 flex-1'>
                            <div className='skeleton w-32 h-4 mb-1'></div>
                            <div className='skeleton w-16 h-4'></div>
                        </div>
                    </div>
                })}
            </div>
        </aside>
    )
}

export default SidebarSkeleton;