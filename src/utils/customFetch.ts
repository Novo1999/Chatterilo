import axios from 'axios'
import { BASE_URL } from './constants'

const customFetch = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

// customFetch.interceptors.response.use(
//   (response) => {
//     return response // If response is successful, return it directly
//   },
//   async (error) => {
//     const originalRequest = error.config
//     if (
//       error.response.status === 401 &&
//       error.response.data.error === 'Unauthorized' &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true
//       try {
//         const { data } = await customFetch.post('auth/refresh')
//         const newAccessToken = data.accessToken

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//         return customFetch(originalRequest)
//       } catch (refreshError) {
//         // Handle refresh token failure (e.g., redirect to login)
//         console.error('Failed to refresh token:', refreshError)
//         throw refreshError
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default customFetch
