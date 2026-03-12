import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

//import { AuthContextProvider } from './auth/context/AuthContext'
import { UsersApp } from './UsersApp'
import './styles.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { queryClient } from './store/queryClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <AuthContextProvider> */}
        <UsersApp />
        {/* </AuthContextProvider> */}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
