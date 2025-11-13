import React from 'react';
import { useLoaderData } from 'react-router';
import MyContainer from '../Components/MyContainer';
import AllReviewcard from '../Components/AllReviewcard';

const AllReview = () => {
  const data = useLoaderData();

  console.log(data);
    return (
       <>
<div className='mb-9'>
<MyContainer>
    <h1 className='text-xl  font-bold text-center mb-9 my-9'>All Reviews</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  container mb-9">
{data.map(reviews=> <AllReviewcard key={reviews._id} reviews={reviews} /> )}
    </div>
    </MyContainer>
</div>
       </>
    );
};

export default AllReview;