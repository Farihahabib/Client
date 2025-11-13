import React, { useContext, useState } from 'react';
import MyLink from './MyLink';
import { DotLoader } from 'react-spinners';
import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const AllReviewcard = ({reviews}) => {
  
    const [loading, setLoading]=useState(true);
    const {user} =   useContext(AuthContext);
    const {_id, photo ,foodName,restaurantName,restaurantLocation,reviewer} = reviews;
    const handlemyfavourite = ()=>{
const review={
     photo ,
     foodName,
     restaurantName,
     restaurantLocation,
     reviewer,
     favourites_by:user.email
    };

      fetch('http://localhost:3100/myfavourites',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(review)

      })
      .then(res=>res.json())
        .then(data=>{
            console.log(review);
            console.log(data);
            toast.success('Added to favourites');
         
        })
        .catch(err=>{
            console.error(err)
        })
        
    }
  
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
 <button onClick={handlemyfavourite} className="btn btn-square hover:text-white ">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.5em] container mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
</button>
    </div>
</div>
        
        
        
        </>
    );
};

export default AllReviewcard;