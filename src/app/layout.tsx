import AuthProvider from '@/providers/AuthProvider'
import ReactQueryProvider from '@/providers/queryClient'
import { caveat, createMetadata, poppins, sora } from '@/utils/constants'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${sora.className} ${poppins.variable} ${caveat.variable}`}
      >
        <Toaster position='top-center' />
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
