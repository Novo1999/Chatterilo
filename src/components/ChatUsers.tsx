import Chatbox from './ChatBox'
import ChatUserItem from './ChatUserItem'

const ChatUsers = () => {
  return (
    <section className='mt-6 block md:flex flex-row md:max-h-[540px] xl:max-h-[600px] 2xl:max-h-[600px]'>
      {/* chat users */}
      <div className='flex flex-col gap-4 xl:w-[35rem] overflow-y-scroll chat-users'>
        <ChatUserItem />
      </div>
      {/* chat box */}
      <Chatbox />
    </section>
  )
}
export default ChatUsers
