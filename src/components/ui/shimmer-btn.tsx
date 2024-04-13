'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const ShimmerBtn = ({
  children,
  open,
}: {
  children: ReactNode
  open: boolean
}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      whileTap={{ scale: 0.9 }}
      className='inline-flex h-[43px] w-[40px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-gradient-to-r from-rose-700 to-pink-600 bg-[length:200%_100%] font-medium text-slate-400 transition-colors'
    >
      {children}
    </motion.button>
  )
}
export default ShimmerBtn
