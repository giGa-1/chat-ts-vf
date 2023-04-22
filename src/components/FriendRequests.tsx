'use client'

import axios from 'axios'
import { Check, UserPlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[],
    sessionId: string,
}

const FriendRequests: FC<FriendRequestsProps> = ({incomingFriendRequests, sessionId}) => {

    const router = useRouter()
    const [friendRequests ,setFriendRequests] = useState<IncomingFriendRequest[]>(
        incomingFriendRequests
    )

    const acceptFriend = async (senderId: string)=>{
        await axios.post('/api/requests/accept', {id: senderId })

        setFriendRequests((prev) => prev.filter((req)=>req.senderId !== senderId))
        
        router.refresh()
    }

    const denyFriend = async (senderId: string)=>{
        await axios.post('/api/requests/deny', {id: senderId })

        setFriendRequests((prev) => prev.filter((req)=>req.senderId !== senderId))
        
        router.refresh()
    }
  return <div>
    {friendRequests.length === 0 ? (
        <p className='text-sm text-zinc-500 '>Nothing to show here...</p>
    ): (
        friendRequests.map((request)=>(
            <div key={request.senderId} className='flex gap-4 items-center'>
                <UserPlus className='text-black '/>
                <p className='font-medium text-lg'>{request.senderEmail}</p>
                <button aria-label='accept fiend' className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'><Check className='font-semibold text-white w-3/4 h-3/4'/></button>
                <button aria-label='deny fiend' className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'><X className='font-semibold text-white w-3/4 h-3/4'/></button>

            </div>
        ))
    )}
  </div>
}

export default FriendRequests