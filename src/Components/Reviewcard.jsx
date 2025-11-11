import React from 'react';

const Reviewcard = ({reviews}) => {
    const { photo ,foodName,restaurantName,restaurantLocation,reviewer} = reviews;
    return (
        <>
<div>
    <div className="img h-30  rounded-t-xl overflow-hidden">
        <img src={photo} alt="food image" className='w-full object-cover' />
    </div>
    <div className="text">
        <h2>{foodName}</h2>
        <p>{restaurantName}</p>
        <p>{restaurantLocation}</p>
        <p>{reviewer.name}</p>
        <p>{reviewer.rating}</p>
    </div>
    <div className="btns flex gap-3">
        <button className="btn">View Details</button>
        <button className="btn">Show All</button>
    </div>
</div>
        
        
        
        </>
    );
};

export default Reviewcard;