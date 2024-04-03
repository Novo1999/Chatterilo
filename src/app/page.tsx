import ChatUsers from '@/components/ChatUsers'
import Stories from '@/components/Stories'
import Header from '../components/Header'

export default function Home() {
  return (
    <main className='bg-[#23262e] min-h-screen pl-3 pr-1 pt-3'>
      <Header />
      <Stories />
      <ChatUsers />
    </main>
  )
}
