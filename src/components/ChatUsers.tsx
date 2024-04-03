import ChatUserItem from './ChatUserItem'

const ChatUsers = () => {
  return (
    <section className='mt-6'>
      <div className='flex flex-col gap-4 h-[500px] overflow-y-scroll'>
        <ChatUserItem />
      </div>
    </section>
  )
}
export default ChatUsers
