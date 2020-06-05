import 'typeface-muli'
import '../styles.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { init, updateStates } from '../lib/ha-websocket-api'

if (process.browser) {
  (async () => {
    try {
      await init()
      updateStates()
    } catch (err) {
      console.error(err)
    }
  })()
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
