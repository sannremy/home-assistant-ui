import 'typeface-montserrat'
import 'typeface-patua-one'

import '../styles.css'
import 'react-circular-progressbar/dist/styles.css'

import { Provider } from 'react-redux'
import { init } from '../lib/ha-websocket-api'
import { store } from '../lib/store'

if (process.browser) {
  init()
}

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
