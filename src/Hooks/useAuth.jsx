import { useContext } from 'preact/hooks'
import { AuthContext } from '../Context/AuthContext'



const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export default useAuth