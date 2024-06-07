import { io } from 'socket.io-client'

const URL = process.env.NEXT_PUBLIC_BASE_URL

export const socket = io(URL as string, { autoConnect: false })
