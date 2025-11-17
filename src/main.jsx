import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import Landing from './landing/Landing'
import WaysideAmenities from './pages/WaysideAmenities'

const getPage = () => {
  const path = window.location.pathname
  if (path === '/wayside-amenities') return <WaysideAmenities />
  if (location.hash === '#/app') return <App />
  return <Landing />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {getPage()}
  </React.StrictMode>,
)

