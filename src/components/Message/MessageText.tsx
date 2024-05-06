import { ReactNode } from 'react'

const MessageText = ({ children }: { children: ReactNode }) => {
  return (
    <p className='bg-green-400 p-2 lg:p-3 max-w-48 xl:max-w-96 md:max-w-60 rounded-xl text-slate-800'>
      {children}
    </p>
  )
}

export default MessageText
