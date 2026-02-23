import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UsersApp } from './UsersApp'
import './styles.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersApp />
  </StrictMode>,
)
