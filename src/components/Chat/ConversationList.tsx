'use client'
import useGetConversations from '@/hooks/api/useGetConversations'
import renderUIBasedOnState from '@/utils/misc/renderUIBasedOnState'
import { AxiosResponse } from 'axios'
import { Loader2 } from 'lucide-react'
import GenericLoader from '../ui/GenericLoader'
import ConversationListItem from './ConversationListItem'

const ConversationList = () => {
  const { data: conversationsData, isLoading, isError } = useGetConversations()

  const {
    isLoadingAndIsNotError,
    isNotLoadingAndIsError,
    dataIsAvailable,
    dataIsNotAvailable,
  } = renderUIBasedOnState(
    conversationsData as AxiosResponse,
    isLoading,
    isError
  )

  let content = null

  if (isLoadingAndIsNotError) {
    content = <GenericLoader />
  }
  if (isNotLoadingAndIsError) {
    content = <div className='text-red-500'>Error Loading Conversations</div>
  }
  if (dataIsNotAvailable) {
    content = <div className='text-white'>No Conversations</div>
  }
  if (dataIsAvailable) {
    content = (
      <div>
        {conversationsData?.data?.map((conversation: IConversation) => {
          return (
            <ConversationListItem
              key={conversation._id}
              conversation={conversation}
            />
          )
        })}
      </div>
    )
  }
  return content
}
export default ConversationList
