import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, FC } from 'react'


export const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disable:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-indigo-600 text-white ',
                ghost: 'bg-transparent hover:text-gray-700 hover:bg-gray-200 '
            },
            size: {
                default: 'h-10 px-6',
                sm: 'h-9 px-2',
                lg: 'h-11 px-8 ',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        },
    }
)


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean
}


const Button: FC<ButtonProps> = ({children, className, variant, isLoading, size, ...props}) => {
  return <button className={cn(buttonVariants({variant, className, size}))} disabled={isLoading} {...props}>{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> :null}{children}</button>
}

export default Button