import { io } from 'socket.io-client'

const URL = process.env.BASE_URL

export const socket = io(URL as string, { autoConnect: false })
