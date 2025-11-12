import React from 'react';
import MyContainer from './MyContainer';

const MyReviewCard = ({reviews}) => {
        const {_id, photo ,foodName,restaurantName,restaurantLocation,reviewer,created_at,created_by} = reviews;
    return (
       <>
       <MyContainer>
       <div className="p-2 transition ease-in  hover:scale-101 container grid grid-cols-6 gap-3 w-full shadow-lg justify-center items-center my-4">
        <img src={photo} alt="" className='rounded-3xl h-30 w-40' />
        <h2 className='text-xl hover:font-bold font-semibold'> {foodName}</h2>
        <h2 className='text-xl hover:font-bold font-semibold'> {restaurantName}</h2>
        <h2 className='text-xl hover:font-bold font-semibold'> {created_at}</h2>
        <button className="btn  hover:text-white">Edit</button>
        <button className="btn  hover:text-white">Delete</button>
       </div>
       </MyContainer>
       </>
    );
};

export default MyReviewCard;