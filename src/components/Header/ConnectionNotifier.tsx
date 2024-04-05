import { Badge } from '@/components/ui/badge'
import useSocket from '@/hooks/useSocket'

const ConnectionNotifier = () => {
  const { isConnected } = useSocket()

  return (
    <Badge
      variant='secondary'
      className={`${
        isConnected
          ? 'bg-teal-400 hover:bg-teal-400'
          : 'bg-red-400 hover:bg-red-400'
      } cursor-default `}
    >
      {isConnected ? 'Connected' : 'Disconnected'}
    </Badge>
  )
}
export default ConnectionNotifier
