
import { render } from 'preact'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './routes/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Context/AuthProvider.jsx'
import { ThemeProvider } from './Components/theme-provider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'   

const queryClient = new QueryClient()

render(
  <ThemeProvider defaultTheme="light" storageKey="foodlovers-ui-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById('root')
)

