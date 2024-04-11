'use client'
import { AuthContext } from '@/context'
import { useGetCurrentUser } from '@/hooks/api/useGetCurrentUser'
import { ReactNode } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useGetCurrentUser()

  return (
    <AuthContext.Provider
      value={{ user: data?.data?.user, isLoading, isError }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
