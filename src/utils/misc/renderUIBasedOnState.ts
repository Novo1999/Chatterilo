import { AxiosResponse } from 'axios'

const renderUIBasedOnState = (
  data: AxiosResponse,
  isLoading: boolean,
  isError: boolean
) => {
  const isNotLoadingAndIsError = !isLoading && isError
  const isLoadingAndIsNotError = isLoading && !isError
  const dataIsAvailable = !isLoading && !isError && !!data.data
  const dataIsNotAvailable = !isLoading && !isError && !data.data

  return {
    isNotLoadingAndIsError,
    dataIsAvailable,
    dataIsNotAvailable,
    isLoadingAndIsNotError,
  }
}

export default renderUIBasedOnState
