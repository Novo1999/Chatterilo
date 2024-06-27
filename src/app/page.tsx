import ConversationContainer from '@/components/Chat/Conversations'
import Header from '@/components/Header/Header'
import Stories from '@/components/Stories'

export default function Home() {
  return (
    <main className='min-h-screen bg-[#57C4E5] p-2 shadow-md'>
      <Header />
      <Stories />
      <ConversationContainer />
    </main>
  )
}
