import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';
import { FaUsers, FaStar, FaHeart, FaEye } from 'react-icons/fa';

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch analytics data
  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const result = await axiosSecure.get('/analytics');
      return result.data;
    }
  });

  const StatCard = ({ icon: Icon, title, value, color, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value || 0}</p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Overview of your Food Lovers Network</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={analytics.totalUsers}
          color="bg-blue-500"
          description="Registered members"
        />
        <StatCard
          icon={FaStar}
          title="Total Reviews"
          value={analytics.totalReviews}
          color="bg-green-500"
          description="Food reviews posted"
        />
        <StatCard
          icon={FaHeart}
          title="Total Favorites"
          value={analytics.totalFavorites}
          color="bg-red-500"
          description="Reviews favorited"
        />
        <StatCard
          icon={FaEye}
          title="Avg Rating"
          value={analytics.averageRating?.toFixed(1)}
          color="bg-yellow-500"
          description="Overall rating"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Top Rated Reviews</h2>
          <div className="space-y-4">
            {analytics.topRatedReviews?.slice(0, 5).map((review, index) => (
              <div key={review._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{review.foodName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.restaurantName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-gray-900 dark:text-white">{review.reviewer?.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User Roles</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Admins</span>
              <span className="font-bold text-red-500">{analytics.roleDistribution?.Admin || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Moderators</span>
              <span className="font-bold text-blue-500">{analytics.roleDistribution?.Moderator || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Users</span>
              <span className="font-bold text-green-500">{analytics.roleDistribution?.User || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Reviews</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400">
                <th>Food</th>
                <th>Restaurant</th>
                <th>Rating</th>
                <th>Author</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentReviews?.slice(0, 10).map((review) => (
                <tr key={review._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="font-semibold text-gray-900 dark:text-white">{review.foodName}</td>
                  <td className="text-gray-700 dark:text-gray-300">{review.restaurantName}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="text-gray-900 dark:text-white">{review.reviewer?.rating}</span>
                    </div>
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">{review.reviewer?.name}</td>
                  <td className="text-gray-700 dark:text-gray-300">{new Date(review.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;