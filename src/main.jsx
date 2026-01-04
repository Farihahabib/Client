
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './routes/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Context/AuthProvider.jsx'
import { StrictMode } from 'react'
 import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'   
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>
    <AuthProvider>
   <RouterProvider router={router} />
   <ToastContainer />
   </AuthProvider>
   </QueryClientProvider>
  </StrictMode>,
)

