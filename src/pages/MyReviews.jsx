import React, { useContext } from 'react';
import MyContainer from '../Components/MyContainer';
import { AuthContext } from '../Context/AuthContext';
import { DotLoader } from 'react-spinners';
import MyReviewCard from '../Components/MyReviewCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSequire';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ['myreviews', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get('/myreviews');
      return result.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <DotLoader />
      </div>
    );
  }

  return (
    <>
      <MyContainer>
        <div className="grid my-9 gap-3">
          {reviews.length === 0 ? (
            <h2 className='text-3xl font-semibold text-center col-span-4 my-20'>
              No Reviews Added By You
            </h2>
          ) : (
            reviews.map(review => (
              <MyReviewCard 
                key={review._id} 
                reviews={review} 
                onDelete={refetch} 
              />
            ))
          )}
        </div>
      </MyContainer>
    </>
  );
};

export default MyReviews;