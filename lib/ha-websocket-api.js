import { store } from "./store"
import { receiveResult } from "../actions"

let id = 0 // Increment id at each send
let socket = null
let isAuthenticated = false

const sendMessage = (message) => {
  // No id for auth
  if (message.type !== 'auth') {
    id++
    message.id = id
  }

  socket.send(JSON.stringify(message))
}

export const init = () => {
  if (!socket) {
    // Create Websocket connection to API
    socket = new WebSocket(process.env.haWebsocketAPI)

    // Debug
    store.dispatch(receiveResult(require('./ha-api-example.json')))

    // Connection success
    socket.addEventListener('open', () => {
      // Handle messages from server
      const handleMessages = event => {
        let data = null
        if (event.data) {
          data = JSON.parse(event.data)
        }

        if (data) {
          // First server response
          if (data.type === 'auth_required') {
            sendMessage({
              'type': 'auth',
              'access_token': process.env.haAccessToken,
            })
          } else if (data.type === 'auth_ok') { // Auth succeeded
            isAuthenticated = true
            getStates()
          } else if (data.type === 'result') {
            // Dispatch to states
            store.dispatch(receiveResult(data))
          }
        }
      }

      // Listen to messages sent by the server
      socket.addEventListener('message', handleMessages)
    })
  }
}

export const getStates = () => {
  if (!isAuthenticated) {
    throw new Error('Not authenticated')
  }

  sendMessage({
    'type': 'get_states',
  })
}
