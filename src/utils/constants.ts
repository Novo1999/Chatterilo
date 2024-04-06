import type { Metadata } from 'next'
import { Caveat, Poppins, Sora } from 'next/font/google'

export const BASE_URL = 'http://localhost:8080/api'

export const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  fallback: ['Inter'],
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  fallback: ['Inter'],
  variable: '--font-poppins',
})

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  fallback: ['Inter'],
  variable: '--font-caveat',
})

const metadata: Metadata = {
  title: 'Chatterilo',
  description: 'A Chat Application',
}

export const createMetadata = () => metadata

export const signUpFormFields = ['username', 'email', 'password']
export const loginFormFields = ['email', 'password']
