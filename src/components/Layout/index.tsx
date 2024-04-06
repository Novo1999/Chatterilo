'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      transition={{ ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
export default Layout
