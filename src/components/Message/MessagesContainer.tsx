import Message from './Message'

const MessagesContainer = ({ messages }: { messages: string[] }) => {
  let content = null

  if (messages.length > 0) {
    content = (
      <div className='h-60'>
        <p>No Messages</p>
      </div>
    )
  } else
    content = (
      <div className='h-96 space-y-4'>
        <Message position='left' />
        <Message position='right' />
        <Message position='left' />
        <Message position='right' />
        <Message position='right' />
        <Message position='right' />
      </div>
    )

  return (
    <section className='text-gray-200 text-sm space-y-4 mt-4 xl:max-h-[640px] xl:min-h-[440px] message-container mb-3 overflow-scroll'>
      {content}
    </section>
  )
}
export default MessagesContainer
