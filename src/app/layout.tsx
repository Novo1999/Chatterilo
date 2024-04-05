import type { Metadata } from 'next'
import { Poppins, Sora } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  fallback: ['Inter'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  fallback: ['Inter'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Chatterilo',
  description: 'A Chat Application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${sora.className} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  )
}
