'use client'
import { pusherClient } from '@/lib/pusher';
import { chatHrefConstructor, toPusherKey } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface SidebarChatListProps {
    friends: User[],
    sessionId: string
}

const SidebarChatList: FC<SidebarChatListProps> = ({sessionId,friends}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([])

    useEffect(()=>{
        pusherClient.subscribe(toPusherKey(`chat:${sessionId}`));

        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

        const chatHandler = ()=>{
            // setUnseenMessages((prev)=>)
            console.log('new chat msgs')
        }
        const newFriendHandler = ()=>{
            router.refresh()
        }
        pusherClient.bind(`new_message`, chatHandler)
        pusherClient.bind(`new_friend`, newFriendHandler)


        return ()=>{
            pusherClient.unsubscribe(toPusherKey(`chat:${sessionId}`));

            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
        }
    },[])

    useEffect(()=>{
        if(pathname?.includes('chat')) {
            setUnseenMessages((prev)=>
                prev.filter((msg) => !pathname.includes(msg.senderId))
            )
        }
    },[pathname])
  return <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
    {friends.sort().map((friend)=> {
        const unseenMessagesCount = unseenMessages.filter(unseen => unseen.senderId === friend.id).length
        return (<li  className='' key={friend.id}>
            <a href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`} 
            className=' text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md text-sm p-2 leading-6 font-semibold'>
                {friend.name}
                {unseenMessagesCount > 0 && <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center align-center' >{unseenMessagesCount}</div>}
            </a>
        </li>)
    })}
  </ul>
}

export default SidebarChatList