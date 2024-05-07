import Chatbox from './ChatBox'
import ChatUserItem from './ChatUserItem'

const ChatUsers = () => {
  return (
    <section className='pt-2 block md:flex flex-row pb-6 h-[66vh]'>
      {/* chat users */}
      <div className='flex flex-col gap-4 sm:w-[30rem] xl:w-[35rem] bg-[#2E4756] h-full overflow-y-scroll chat-users shadow-sm shadow-slate-200 rounded-b-md p-2'>
        <p className='text-white'>Messages</p>
        <ChatUserItem />
      </div>
      {/* chat box */}
      <Chatbox />
    </section>
  )
}
export default ChatUsers
