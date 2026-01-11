
import { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import ProfileImage from '../Components/ProfileImage';

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  
  const [stats, setStats] = useState({
    totalReviews: 0,
    myFavoritesCount: 0,
    loading: true
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user?.email) return;
      
      try {
        setStats(prev => ({ ...prev, loading: true }));
        
        // Fetch user's reviews count
        const statsResponse = await axiosSecure.get('/user/stats');
        const totalReviews = statsResponse.data.totalReviews || 0;
        
        // Fetch user's favorites count (items they've favorited)
        const favoritesResponse = await axiosSecure.get('/my-favourites');
        const myFavoritesCount = favoritesResponse.data?.length || 0;
        
        setStats({
          totalReviews,
          myFavoritesCount,
          loading: false
        });
        
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setStats({
          totalReviews: 0,
          myFavoritesCount: 0,
          loading: false
        });
      }
    };

    fetchUserStats();
  }, [user?.email, axiosSecure]);

  console.log(role, isRoleLoading);

  return (
    <div className='flex justify-center items-center min-h-screen py-8 px-4'>
      <div className='bg-white dark:bg-gray-800 shadow-2xl rounded-2xl md:w-4/5 lg:w-3/5 max-w-4xl overflow-hidden'>
        {/* Cover Photo - Food themed gradient */}
        <div className='relative h-56 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500'>
          {/* Food pattern overlay */}
          <div className='absolute inset-0 opacity-20'>
            <div className='w-full h-full' style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          {/* Food icons decoration */}
          <div className='absolute top-4 left-4 text-white/30 text-2xl'>🍕</div>
          <div className='absolute top-8 right-8 text-white/30 text-2xl'>🍔</div>
          <div className='absolute bottom-4 left-8 text-white/30 text-2xl'>🍜</div>
          <div className='absolute bottom-8 right-4 text-white/30 text-2xl'>🥗</div>
          
          {/* Title overlay */}
          <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
            <h1 className='text-white text-2xl font-bold text-center drop-shadow-lg'>
              Food Lover Profile
            </h1>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center p-6 -mt-16'>
          {/* Profile Picture */}
          <div className='relative'>
            <ProfileImage
              src={user?.photoURL}
              alt="Profile picture"
              size="h-32 w-32"
              className="border-4 border-white dark:border-gray-700 shadow-lg"
              name={user?.displayName}
            />
            <div className='absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2'>
              <div className='w-4 h-4 bg-white rounded-full'></div>
            </div>
          </div>

          {/* Role Badge */}
          <div className='mt-4'>
            <span className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF4500] to-[#E03E00] rounded-full shadow-lg'>
              {role || 'User'}
            </span>
          </div>

          {/* User Info Cards */}
          <div className='w-full mt-6 space-y-4'>
            {/* Name Card */}
            <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm'>
              <div className='flex items-center space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-blue-600 dark:text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                    </svg>
                  </div>
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Full Name</p>
                  <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {user?.displayName || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm'>
              <div className='flex items-center space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-green-600 dark:text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                  </div>
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Email Address</p>
                  <p className='text-lg font-semibold text-gray-900 dark:text-white break-all'>
                    {user?.email || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* User ID Card */}
            <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm'>
              <div className='flex items-center space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-purple-600 dark:text-purple-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v8h12V6z' clipRule='evenodd' />
                    </svg>
                  </div>
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>User ID</p>
                  <p className='text-sm font-mono text-gray-900 dark:text-white break-all'>
                    {user?.uid || 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='w-full mt-6 grid grid-cols-2 gap-4'>
            {/* Reviews Written */}
            <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-center text-white'>
              <div className='text-2xl font-bold'>🏆</div>
              <div className='text-sm font-medium'>Reviews Written</div>
              <div className='text-lg font-bold'>
                {stats.loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  stats.totalReviews
                )}
              </div>
            </div>

            {/* My Favorites */}
            <div className='bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-center text-white'>
              <div className='text-2xl font-bold'>❤️</div>
              <div className='text-sm font-medium'>My Favorites</div>
              <div className='text-lg font-bold'>
                {stats.loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  stats.myFavoritesCount
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;