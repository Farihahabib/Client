import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const AddReview = () => {
  const { user } = useContext(AuthContext);
    const handleAddReview = (e) => {
      e.preventDefault()
      const form = {
        
        photo: e.target.photoURL.value,
        foodName: e.target.displayFoodName.value,
        restaurantName: e.target.displayResName.value,
        restaurantLocation: e.target.location.value,
       
        reviewer:{
          name: user?.displayName || "Anonymous",
          rating: e.target.rating.value,
          review: e.target.review.value,
        },
        
       created_at: new Date().toLocaleDateString()
      //  .toISOString().split('T')[0]
      //  .toLocaleDateString('en-CA'),
      ,
       created_by: user?.email,

      }

      fetch('https://server-alpha-neon.vercel.app/reviews',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(form)
      })
      .then(res=>res.json())
      .then(data=>{
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
         <h1 className='text-3xl font-bold text-center mt-9'>Add Your Review</h1>
       <div className='flex  items-center justify-center container mx-auto py-8 '>
            <form onSubmit={handleAddReview} className='fieldset shadow-2xl border-base-300  rounded-box w-xs border  p-4'>
   <label className="label font-bold my-2">Food Name</label>        
  <input type="text" name='displayFoodName' className="input  h-9 " placeholder="Food Name" />
  <label className="label font-bold my-2">Photo</label>
  <input type="text"  name='photoURL'  className="input  h-9 " placeholder="choose a photo" />
   <label className="label font-bold my-2 ">Restaurant Name</label>        
  <input type="text" name='displayResName' className="input  h-9 " placeholder="Restaurant Name" />
   <label className="label font-bold my-2">Location</label>        
  <input type="text" name='location' className="input  h-9 " placeholder="Location" />
  
   <label className="label font-bold my-2">Rating</label>        
  <input type="text" name='rating' className="input  h-9 " placeholder="Rating" />
  
    <label className="label font-bold my-2">Your Review</label>
    <textarea  name='review' className="input  h-20 " placeholder="Write your review here..." />
    <button className='btn flex justify-center items-center text-white  my-4'>Add review</button>
            </form>
     </div>
        </>
    );
};

export default AddReview;