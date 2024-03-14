//App
import { App } from './App'

//Libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

//Styles
import './styles.css'
import 'foundation-sites/dist/css/foundation.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </BrowserRouter>
)
