import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import Landing from './landing/Landing'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {location.hash === '#/app' ? <App /> : <Landing />}
  </React.StrictMode>,
)

