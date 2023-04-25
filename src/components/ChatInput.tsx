"use client"

import { FC, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import Button from './UI/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ChatInputProps {
    chatPartner: User,
    chatId: string
}


const ChatInput: FC<ChatInputProps> = ({chatPartner, chatId}) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const sendMessage = async ()=>{
        setIsLoading(true);


        try {
            setInput('');
            textareaRef.current?.focus()
            await axios.post('/api/message/send', {text:input, chatId})
           
        } catch (error) {
            toast.error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    };


  return <div className='border-t border-gray-200 px-4 pt-5 mb-2 sm:mb-0'>
    <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize 
            ref={textareaRef} 
            onKeyDown={(e)=>{ 
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                }

            }} 
            rows={1} 
            value={input}
            maxRows={6} 
            onChange={e=>setInput(e.target.value)} 
            placeholder={`Message ${chatPartner.name}`}
            className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 sm:pu-1.5 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
        />
        <div onClick={()=>textareaRef.current?.focus()}  className="py-2" area-hidden='true'>
            <div className="py-px">
                <div className='h-9'/>
            </div>
        </div>


        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
            <div className="flex-shrin-0">
                <Button isLoading={isLoading} onClick={sendMessage} type='submit'>Post</Button>
            </div>
        </div>
    </div>
  </div>
}

export default ChatInput