import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// Core styles
import './index.css'
import './chunks.css'
// Component styles
import './styles/homepage.css'
import './styles/additional.css'
import './styles/auth.css'
import './styles/loginpage.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)