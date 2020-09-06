import { dispatch } from './store'
import { receiveResult, receiveEvent } from "../actions"

let id = 0 // Increment id at each send
let socket = null
let isAuthenticated = false

export const sendMessage = (message) => {
  // No id for auth
  if (message.type !== 'auth') {
    id++
    message.id = id

    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }
  }

  socket.send(JSON.stringify(message))
}

export const init = () => {
  if (!socket) {
    // Create Websocket connection to API
    socket = new WebSocket(process.env.haWebsocketAPI)

    // Debug
    // dispatch(receiveResult(require('./ha-api-example.json')))

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
            subscribeToStateChangedEvents()
          } else if (data.type === 'result') {
            // Dispatch to states
            dispatch(receiveResult(data))
          } else if (data.type === 'event') {
            dispatch(receiveEvent(data))
          }
        }
      }

      // Listen to messages sent by the server
      socket.addEventListener('message', handleMessages)
    })
  }
}

const getStates = () => {
  if (!isAuthenticated) {
    throw new Error('Not authenticated')
  }

  sendMessage({
    'type': 'get_states',
  })
}

const subscribeToStateChangedEvents = () => {
  if (!isAuthenticated) {
    throw new Error('Not authenticated')
  }

  sendMessage({
    'type': 'subscribe_events',
    'event_type': 'state_changed',
  })
}
