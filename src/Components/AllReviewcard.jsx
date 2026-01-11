import React, { useState } from 'react';
import MyLink from './MyLink';
import { DotLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import useAuth from '../Hooks/useAuth'; 
import useAxiosSecure from '../Hooks/useAxiosSequire';

const AllReviewcard = ({ reviews }) => {
    const {_id, photo ,foodName,restaurantName,restaurantLocation,reviewer} = reviews;
    
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleAddToFavourites = async () => {
    if (!user?.email) {
      toast.error('You must be logged in to add favourites');
      return;
    }

    const favouriteReview = {
      _id, // Include the review ID for reference
      photo,
      foodName,
      restaurantName,
      restaurantLocation,
      reviewer,
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post('/myfavourites', favouriteReview);
      console.log(res.data);
      toast.success('Added to favourites');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409 && err.response?.data?.alreadyExists) {
        toast.warning('This item is already in your favourites');
      } else {
        toast.error('Failed to add to favourites');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-xl mx-1 transition ease-in-out hover:scale-104 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      {/* Image */}
      <div className="img h-48 rounded-t-2xl overflow-hidden">
        <img src={photo} alt={foodName} className="w-full h-48 object-cover" />
      </div>

      {/* Content */}
      <div className="text p-4">
        <h2 className='text-xl font-semibold text-[#FF4500] hover:font-bold'>{foodName}</h2>
        <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Restaurant: {restaurantName}</p>
        <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Location: {restaurantLocation}</p>
        <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Reviewer: {reviewer?.name}</p>
        <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Rating: {reviewer?.rating}</p>
      </div>

      {/* Buttons */}
      <div className="btns flex gap-3 mx-auto justify-center mb-2">
        <MyLink to={`/reviewdetails/${_id}`}>
          <button className="btn p-1 hover:text-white">View Details</button>
        </MyLink>
        <button 
          onClick={handleAddToFavourites}
          disabled={loading}
          className="btn p-1 hover:text-white"
        >
          {loading ? <DotLoader size={20} /> : 'Add to Favourites'}
        </button>
      </div>
    </div>
  );
};

export default AllReviewcard;