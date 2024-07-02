import useGetConversationLength from '@/hooks/api/useGetConversationLength'
import renderUIBasedOnState from '@/utils/misc/renderUIBasedOnState'
import { AxiosResponse } from 'axios'
import GenericLoader from '../ui/GenericLoader'

const TotalConversations = () => {
  const { isLoading, isError, data } = useGetConversationLength()

  let content = null

  const {
    isLoadingAndIsNotError,
    isNotLoadingAndIsError,
    dataIsAvailable,
    dataIsNotAvailable,
  } = renderUIBasedOnState(data as AxiosResponse, isLoading, isError)

  if (isLoadingAndIsNotError) {
    content = <GenericLoader />
  }
  if (isNotLoadingAndIsError) {
    content = (
      <div className='text-red-500'>Error Loading Total Conversations</div>
    )
  }

  if (dataIsNotAvailable) {
    content = <div className='text-white'>0 Conversations</div>
  }

  if (dataIsAvailable) {
    content = (
      <p className='text-white'>
        Conversations ({data?.data?.conversationLength})
      </p>
    )
  }
  return content
}
export default TotalConversations
