'use client'
import { ButtonHTMLAttributes, FC, useState } from 'react'

import Button from './UI/Button'
import { toast } from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { Loader2, LogOut } from 'lucide-react'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  
}

const SignOutButton: FC<SignOutButtonProps> = ({...props}) => {
    const [isSigingnOut, setIsSigningOut] = useState<boolean>(false)
  return <Button {...props} variant={'ghost'} onClick={async () => {
    setIsSigningOut(true);
    try {
        signOut()
    } catch (error) {
        toast.error('That was a problem signing out')
    } finally {
        setIsSigningOut(false);
    }
  }}>
    {
        isSigingnOut ? (
            <Loader2 className='animate-spin h-4 w-4'/>
        ) 
        : (
            <LogOut className='w-4 h-4'/>
        )
    }
  </Button>
}

export default SignOutButton