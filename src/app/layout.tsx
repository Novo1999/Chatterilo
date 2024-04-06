import { caveat, createMetadata, poppins, sora } from '@/utils/constants'

import ReactQueryProvider from '@/providers'
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
