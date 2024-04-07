'use client'
import { AuthContext } from '@/context'
import { useGetCurrentUser } from '@/hooks/api/useGetCurrentUser'
import { ReactNode } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetCurrentUser()

  return (
    <AuthContext.Provider value={{ user: data?.data?.user }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
