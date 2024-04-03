import Chatbox from './ChatBox'
import ChatUserItem from './ChatUserItem'

const ChatUsers = () => {
  return (
    <section className='mt-6 block md:flex flex-row max-h-[540px] 2xl:max-h-[620px]'>
      {/* chat users */}
      <div className='flex flex-col gap-4 xl:w-[35rem] overflow-y-scroll'>
        <ChatUserItem />
      </div>
      {/* chat box */}
      <Chatbox />
    </section>
  )
}
export default ChatUsers
