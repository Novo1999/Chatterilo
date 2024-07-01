'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { ReactNode, useEffect, useState } from 'react'

const TooltipContainer = ({
  children,
  text,
}: {
  children: ReactNode
  text: string
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    isMounted && (
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipPortal container={document.body}>
            <TooltipContent>
              <p>{text}</p>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    )
  )
}
export default TooltipContainer
