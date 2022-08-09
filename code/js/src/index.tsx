import * as React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { createRoot } from 'react-dom/client'
import App from './App'


const root = createRoot(document.getElementById('mainDiv'))


root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
)
