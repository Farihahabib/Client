import React, { useContext } from 'react';
import MyContainer from '../Components/MyContainer';
import { DotLoader } from 'react-spinners';
import { AuthContext } from '../Context/AuthContext';
import MyFavCard from '../Components/MyFavCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import useAuth from '../Hooks/useAuth';

const MyFavourite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading, error, refetch } = useQuery({
    queryKey: ['my-favourites', user?.email],
    queryFn: async () => {
      try {
        const result = await axiosSecure.get('/my-favourites');
        return result.data;
      } catch (error) {
        console.error('Error fetching favourites:', error);
        throw error;
      }
    },
    enabled: !!user?.email,
    retry: 1
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <DotLoader />
      </div>
    );
  }

  if (error) {
    return (
      <MyContainer>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Error Loading Favourites
          </h2>
          <p className="text-gray-600 mb-4">
            {error.response?.data?.message || 'Something went wrong'}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </MyContainer>
    );
  }

  return (
    <>
      <MyContainer>
        <div className="my-9">
          <h1 className="text-3xl font-bold text-center mb-8">My Favourite Reviews</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {reviews.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
                  No Favourite Reviews Yet
                </h2>
                <p className="text-gray-500">
                  Start adding reviews to your favourites to see them here!
                </p>
              </div>
            ) : (
              reviews.map(review => (
                <MyFavCard 
                  key={review._id} 
                  reviews={review} 
                  onRemove={refetch}
                />
              ))
            )}
          </div>
        </div>
      </MyContainer>
    </>
  );
};

export default MyFavourite;