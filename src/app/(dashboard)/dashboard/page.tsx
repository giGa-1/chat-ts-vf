import Button from '@/components/UI/Button'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const page =  async  ()=> {

  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    // <Button >Hello</Button>
    <pre>
      {JSON.stringify(session)}
    </pre>
  )
}


export default page 