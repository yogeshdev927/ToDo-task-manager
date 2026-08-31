import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { TodoIndex } from './to-do/to-doIndex.jsx'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <TodoIndex />
      </CookiesProvider>
    </Provider>
  </StrictMode>
)
