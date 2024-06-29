import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

const TooltipContainer = ({
  children,
  text,
}: {
  children: ReactNode
  text: string
}) => {
  return (
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
}
export default TooltipContainer
