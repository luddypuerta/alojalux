import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import 'foundation-sites/dist/css/foundation.min.css';
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </BrowserRouter>
)
