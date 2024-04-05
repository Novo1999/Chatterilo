import ChatUsers from '@/components/ChatUsers'
import Header from '@/components/Header/Header'
import Stories from '@/components/Stories'

export default function Home() {
  return (
    <main className='bg-[#23262e] min-h-screen pl-3 pr-1 pt-3'>
      <Header />
      <Stories />
      <ChatUsers />
    </main>
  )
}
