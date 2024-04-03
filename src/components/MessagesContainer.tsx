import Message from './Message'

const MessagesContainer = () => {
  return (
    <div className='flex-1 text-gray-200 text-sm space-y-4 mt-4 max-h-[640px] mb-3 overflow-scroll'>
      <Message position='left' />
      <Message position='right' />
      <Message position='left' />
      <Message position='right' />
      <Message position='right' />
    </div>
  )
}
export default MessagesContainer
