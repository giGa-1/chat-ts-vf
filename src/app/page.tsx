import { Inter } from 'next/font/google'
import Button from '@/components/UI/Button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Button>hello</Button>
    </div>
  )
}
