import ChatUsers from '@/components/Chat/ChatUsers'
import Header from '@/components/Header/Header'
import Stories from '@/components/Stories'
import MessagesProvider from '@/providers/MessagesProvider'

export default function Home() {
  return (
    <main className='min-h-screen p-2 shadow-md'>
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
