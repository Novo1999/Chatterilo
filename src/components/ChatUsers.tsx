import Chatbox from './ChatBox'
import ChatUserItem from './ChatUserItem'

const ChatUsers = () => {
  return (
    <section className='mt-6 block md:flex flex-row'>
      {/* chat users */}
      <div className='flex flex-col gap-4 h-[550px] xl:h-[620px] xl:w-[35rem] overflow-y-scroll'>
        <ChatUserItem />
      </div>
      {/* chat box */}
      <Chatbox />
    </section>
  )
}
export default ChatUsers
