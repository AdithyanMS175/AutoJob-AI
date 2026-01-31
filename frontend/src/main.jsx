import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from './contextAPI/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <AuthContext>
          <App />
        </AuthContext>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
