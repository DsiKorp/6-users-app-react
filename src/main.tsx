import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from './auth/context/AuthContext'
import { UsersApp } from './UsersApp'
import './styles.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UsersApp />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
