import Chatbox from './ChatBox'
import ChatUserItem from './ChatUserItem'

// md:max-h-[540px]  bg-[#9EE493] xl:max-h-[620px] 2xl:max-h-[600px]

const ChatUsers = () => {
  return (
    <section className='p-2 block md:flex flex-row bg-[#9EE493] pb-6 h-[60vh] xl:h-[65vh]'>
      {/* chat users */}
      <div className='flex flex-col gap-4 sm:w-96 xl:w-[35rem] bg-[#2F4858] h-full overflow-y-scroll chat-users shadow-sm shadow-slate-200 rounded-md p-2'>
        <p className='text-white'>Messages</p>
        <ChatUserItem />
      </div>
      {/* chat box */}
      <Chatbox />
    </section>
  )
}
export default ChatUsers
