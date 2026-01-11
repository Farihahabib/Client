import { useEffect } from 'preact/hooks'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async (config) => {
          // Get the current Firebase ID token
          if (user) {
            try {
              const token = await user.getIdToken();
              config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
              console.error('Error getting ID token:', error);
            }
          }
          return config;
        }
      )

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logout()
              .then(() => {
                console.log('Logged out successfully.')
              })
              .catch(console.error)
            navigate('/login')
          }
          return Promise.reject(err)
        }
      )

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, logout, navigate])

  return axiosInstance
}
export default useAxiosSecure