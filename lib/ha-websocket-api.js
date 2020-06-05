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
  if (socket) {
    return Promise.resolve(true)
  }

  // Create Websocket connection to API
  socket = new WebSocket(process.env.haWebsocketAPI)

  return new Promise((resolve, reject) => {
    // Connection success
    socket.addEventListener('open', () => {
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
            return resolve(true)
          } else if (data.type === 'auth_invalid') { // Auth invalid
            return reject(false)
          } else {
            // Dispatch to states
            return resolve(true)
          }
        }
      }

      // Listen to messages sent by the server
      socket.addEventListener('message', handleMessages)
    })
  })

}

export const updateStates = () => {
  if (!isAuthenticated) {
    throw new Error('Not authenticated')
  }

  sendMessage({
    'type': 'get_states',
  })
}
