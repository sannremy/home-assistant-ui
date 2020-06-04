import 'typeface-muli'
import '../styles.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

if (process.browser) {
  const socket = new WebSocket(process.env.haWebsocketAPI)

  socket.addEventListener('open', event => {
    // Listen for messages
    socket.addEventListener('message', event => {
      let data = null
      if (event.data) {
        data = JSON.parse(event.data)
      }

      if (data) {
        let message = {}

        switch (data.type) {
          case 'auth_required':
            message = {
              'type': 'auth',
              'access_token': process.env.haAccessToken,
            }
            break
          case 'auth_ok':
            message = {
              'id': 1,
              'type': 'get_states',
            }
            break
        }

        socket.send(JSON.stringify(message));
      }
    })
  })
}

const store = createStore(rootReducer, applyMiddleware(thunk))

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
