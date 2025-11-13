import React from 'react';
import MyLink from './MyLink';

const MyFavCard = ({reviews}) => {
    const {_id, photo ,foodName,restaurantName,restaurantLocation,reviewer} = reviews;
    return (
               <>
<div className='shadow-xl mx-9 transition ease-in-out  hover:scale-104 '>
    <div className="img h-30  rounded-t-2xl overflow-hidden ">
        <img src={photo} alt="food image" className=' ' />
    </div>
    <div className="text p-4">
        <h2 className='text-xl font-semibold text-[#FF4500] hover:font-bold'> {foodName}</h2>
        <p className='text-md font-semibold'>Restaurant : {restaurantName}</p>
        <p className='text-md font-semibold'> Location : {restaurantLocation}</p>
        <p className='text-md font-semibold'>Reviewer : {reviewer?.name}</p>
        <p className='text-md font-semibold'>Rating : {reviewer?.rating}</p>
    </div>
    <div className="btns flex gap-3 mx-auto justify-center mb-2">
     <MyLink to={`/reviewdetails/${_id}`}>  <button className="btn p-1 hover:text-white ">View Details</button></MyLink> 
    </div>
    </div> 
        </>
        );
    }


export default MyFavCard;