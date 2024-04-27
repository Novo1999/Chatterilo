import Message from './Message'

const MessagesContainer = ({ messages }: { messages: string[] }) => {
  let content = null

  if (messages.length === 0) {
    content = <p>No Messages</p>
  } else
    content = (
      <>
        <Message position='left' />
        <Message position='right' />
        <Message position='left' />
        <Message position='right' />
        <Message position='right' />
      </>
    )

  return (
    <div className='text-gray-200 text-sm space-y-4 mt-4 max-h-[640px] min-h-[440px] message-container mb-3 overflow-scroll'>
      {content}
    </div>
  )
}
export default MessagesContainer
