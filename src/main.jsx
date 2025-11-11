
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './routes/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvder from './Context/AuthContext.jsx'
import { StrictMode } from 'react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvder>
   <RouterProvider router={router} />
   <ToastContainer />
   </AuthProvder>
  </StrictMode>,
)

