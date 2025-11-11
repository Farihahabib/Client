import React from 'react';
import { useLoaderData } from 'react-router';
import Reviewcard from '../Components/Reviewcard';
import MyContainer from '../Components/MyContainer';

const AllReview = () => {
  const data = useLoaderData();
  console.log(data);
    return (
       <>
<div>
<MyContainer>
    <h1 className='text-xl font-bold text-center mb-9 my-9'>All Reviews</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mx-auto container">
{data.map(reviews=> <Reviewcard key={reviews._id} reviews={reviews} /> )}
    </div>
    </MyContainer>
</div>
       </>
    );
};

export default AllReview;