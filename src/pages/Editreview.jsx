import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const Editreview = () => {
      const data = useLoaderData();
      const navigate = useNavigate()
    const review = data.result;
    console.log(review);
        const handleEditReview = (e) => {
          e.preventDefault()
          const form = {
           photo: e.target.photoURL.value,
            foodName: e.target.displayFoodName.value,
            restaurantName: e.target.displayResName.value,
            restaurantLocation: e.target.location.value,
            reviewer:{
              rating: e.target.rating.value,
              review: e.target.review.value,
            },
    
          }
    
          fetch(`https://server-alpha-neon.vercel.app/reviews/${review._id}`,{
            method:'PUT',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(form)
          })
          .then(res=>res.json())
          .then(data=>{
                    navigate('/MyReviews')
            toast.success('Review added successfully');
    
            console.log(data); 
        
          })
          .catch(err=>{
            console.error(err);
          })
    
          console.log(form);
        };
    return (
            <>
         <h1 className='text-3xl font-bold text-center mt-9'>Edit Your Review</h1>
       <div className='flex  items-center justify-center container mx-auto py-8 '>
            <form onSubmit={handleEditReview}  className='fieldset shadow-2xl border-base-300  rounded-box w-xs border  p-4'>
   <label className="label font-bold my-2">Food Name</label>        
  <input type="text" name='displayFoodName' className="input  h-9 " defaultValue={review.foodName} />
  <label className="label font-bold my-2">photo</label>
  <input type="text"  name='photoURL'  className="input  h-9 " defaultValue={review.photo}/>
<label className="label font-bold my-2 ">Restaurant</label>        
  <input type="text" name='displayResName' className="input  h-9 " defaultValue={review.restaurantName} />
   <label className="label font-bold my-2">Location</label>        
  <input type="text" name='location' className="input  h-9 " defaultValue={review.restaurantLocation} />
  
   <label className="label font-bold my-2">Rating</label>        
  <input type="text" name='rating' className="input  h-9 " defaultValue={review.reviewer.rating} />
  
    <label className="label font-bold my-2">Your Review</label>
    <textarea  name='review' className="input  h-20 " defaultValue={review.reviewer.review}placeholder="Write your review here..." />
    <button className='btn flex justify-center items-center text-white  my-4'>Add review</button>
            </form>
     </div>
        </>
    );
};

export default Editreview;