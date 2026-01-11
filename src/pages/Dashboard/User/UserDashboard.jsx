import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';
import useAuth from '../../../Hooks/useAuth';
import { FaStar, FaHeart, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user stats
  const { data: userStats = {}, isLoading } = useQuery({
    queryKey: ['user-stats', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get('/user/stats');
      return result.data;
    },
    enabled: !!user?.email
  });

  // Fetch user's recent reviews
  const { data: recentReviews = [] } = useQuery({
    queryKey: ['user-recent-reviews', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get('/myreviews');
      return result.data.slice(0, 5); // Get latest 5 reviews
    },
    enabled: !!user?.email
  });

  const StatCard = ({ icon: Icon, title, value, color, link }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value || 0}</p>
          {link && (
            <Link to={link} className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block">
              View all →
            </Link>
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
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome back, {user?.displayName || 'Food Lover'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your food reviews</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={FaStar}
          title="My Reviews"
          value={userStats.totalReviews}
          color="bg-blue-500"
          link="/MyReviews"
        />
        <StatCard
          icon={FaHeart}
          title="Favorites Received"
          value={userStats.totalFavoritesReceived}
          color="bg-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/add-review" 
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <FaPlus className="text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Add New Review</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share your food experience</p>
            </div>
          </Link>
          
          <Link 
            to="/MyReviews" 
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <FaStar className="text-green-600 dark:text-green-400" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">My Reviews</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your reviews</p>
            </div>
          </Link>
          
          <Link 
            to="/MyFavourite" 
            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FaHeart className="text-red-600 dark:text-red-400" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">My Favorites</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View saved reviews</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Reviews</h2>
          <Link to="/MyReviews" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            View all →
          </Link>
        </div>
        
        {recentReviews.length > 0 ? (
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{review.foodName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.restaurantName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-gray-900 dark:text-white">{review.reviewer?.rating}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't written any reviews yet</p>
            <Link 
              to="/add-review" 
              className="btn btn-primary"
            >
              Write Your First Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;