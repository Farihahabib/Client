import React, { useContext, useEffect, useState } from 'react';
import AllReviewcard from '../Components/AllReviewcard';
import MyContainer from '../Components/MyContainer';
import { DotLoader } from 'react-spinners';
import { AuthContext } from '../Context/AuthProvider';

const MyFavourite = () => {
    const {user} = useContext(AuthContext);
    const [reviews, setReviews]=useState([]);
    const [loading, setLoading]=useState(true);
     useEffect(() => {
        fetch(`http://localhost:3100/my-favourites?email=${user.email}`)
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
<div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-9 gap-3">
 
  {
    reviews.length === 0 ? <h2 className='text-3xl font-semibold text-center col-span-4 my-20'>No Reviews Added By You</h2>
   :
   reviews.map(reviews =><AllReviewcard  key={reviews._id} reviews={reviews} />) }
</div>

        
      </MyContainer>
      
      </>
  );
};

export default MyFavourite;