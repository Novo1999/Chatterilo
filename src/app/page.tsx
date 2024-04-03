import ChatUsers from '@/components/ChatUsers'
import Stories from '@/components/Stories'
import Header from '../components/Header'

export default function Home() {
  return (
    <main className='bg-[#23262e] min-h-screen p-6'>
      <Header />
      <Stories />
      <ChatUsers />
    </main>
  )
}
