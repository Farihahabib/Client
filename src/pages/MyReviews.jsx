import React, { useContext, useEffect, useState } from 'react';
import MyContainer from '../Components/MyContainer';
import { AuthContext } from '../Context/AuthContext';
import { DotLoader } from 'react-spinners';
import MyReviewCard from '../Components/MyReviewCard';

const MyReviews = () => {
  const {user} = useContext(AuthContext);
  const [reviews, setReviews]=useState([]);
  const [loading, setLoading]=useState(true);
  useEffect(() => {
    fetch(`https://server-alpha-neon.vercel.app/myreviews?email=${user.email}`)
    .then(res => res.json())
    .then(data => {
      setReviews(data);
      setLoading(false);
    })
  },[])
  if(loading){
    return <DotLoader />;
  }
    return (
      <>
      <MyContainer>
<div className=" grid my-9 gap-3">
 
  {
    reviews.length === 0 ? <h2 className='text-3xl font-semibold text-center col-span-4 my-20'>No Reviews Added By You</h2>
   :
   reviews.map(reviews =><MyReviewCard key={reviews._id} reviews={reviews} />) }
</div>

        
      </MyContainer>
      
      </>
    );
};

export default MyReviews;