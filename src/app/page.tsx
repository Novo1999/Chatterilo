import ChatUsers from '@/components/ChatUsers'
import Header from '@/components/Header/Header'
import Stories from '@/components/Stories'
import MessagesProvider from '@/providers/MessagesProvider'

export default function Home() {
  return (
    <main className='bg-[#23262e] min-h-screen pl-3 pr-1 pt-3'>
      <MessagesProvider>
        <Header />
      </MessagesProvider>
      <Stories />
      <MessagesProvider>
        <ChatUsers />
      </MessagesProvider>
    </main>
  )
}
