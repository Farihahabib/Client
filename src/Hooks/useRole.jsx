
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSequire'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role/`)
      console.log(result.data)
      return result.data.role
    },
  })

  return [role, isRoleLoading]
}

export default useRole