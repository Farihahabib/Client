import React from 'react';
import { useLoaderData } from 'react-router';
import MyContainer from '../Components/MyContainer';

const ReviewDetail = () => {
    const data = useLoaderData();
    const review = data.result;
    console.log(review);
    return (
        <>
        <MyContainer>
        <div className='shadow-lg p-4 rounded-lg border border-gray-200  my-9 container mx-auto '>
            <div className="rounded-lg overflow-hidden mb-4 w-90 container mx-auto">
                <img src={review.photo} alt="FoodImage" />
            </div>
            <div className="text container mx-auto">
                <h1 className='font-semibold text-center'><span className='border-b-2 mb- text-md'>Name:</span><br></br>{review.foodName}</h1>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Restaurant:</span><br></br>{review.restaurantName}</p>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Location:</span><br></br>{review.restaurantLocation}</p>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Reviewer:</span><br></br>{review.reviewer.name}</p>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Rating:</span><br></br>{review.reviewer.rating}</p>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Review:</span><br></br>{review.reviewer.review}</p>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Review Time:</span><br></br>{review.created_at}</p>
                <p className='font-semibold text-center'><span className='border-b-2 mb-3 text-md'>Reviewer Email:</span><br></br>{review.created_by}</p>
            </div>
        </div>
        </MyContainer>
        </>
    );
};

export default ReviewDetail;