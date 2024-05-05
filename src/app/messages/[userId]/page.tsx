import Chatbox from '@/components/Chat/ChatBox'
import MessagesProvider from '@/providers/MessagesProvider'

const page = () => {
  return (
    <div className='bg-[#23262e] min-h-screen flex flex-row'>
      <MessagesProvider>
        <Chatbox />
      </MessagesProvider>
    </div>
  )
}
export default page
