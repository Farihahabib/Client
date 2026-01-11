import { useContext } from 'preact/hooks';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import { useNavigate } from 'react-router-dom';
import MyContainer from '../Components/MyContainer';
import { FaStar, FaUtensils, FaMapMarkerAlt, FaCamera, FaPen } from 'react-icons/fa';

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAddReview = async (e) => {
    e.preventDefault()
    const form = {
      photo: e.target.photoURL.value,
      foodName: e.target.displayFoodName.value,
      restaurantName: e.target.displayResName.value,
      restaurantLocation: e.target.location.value,
      reviewer: {
        name: user?.displayName || "Anonymous",
        rating: parseFloat(e.target.rating.value),
        review: e.target.review.value,
        email: user?.email,
        photoURL: user?.photoURL
      },
      created_at: new Date().toISOString(),
      created_by: user?.email,
    }

    try {
      const response = await axiosSecure.post('/reviews', form);
      if (response.data.success) {
        toast.success('Review added successfully');
        navigate('/MyReviews');
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add review. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <MyContainer>
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Add Your Review
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Share your dining experience with the community
            </p>
          </div>
          
          {/* Form Card */}
          <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8'>
            <form onSubmit={handleAddReview} className='space-y-6'>
              
              {/* Food Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Food Name
                </label>        
                <input 
                  type="text" 
                  name='displayFoodName' 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200" 
                  placeholder="Enter food name (e.g., Margherita Pizza)" 
                  required
                />
              </div>

              {/* Food Photo URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Food Photo URL
                </label>
                <input 
                  type="url" 
                  name='photoURL'  
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200" 
                  placeholder="Enter photo URL (https://...)" 
                  required
                />
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Restaurant Name
                </label>        
                <input 
                  type="text" 
                  name='displayResName' 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200" 
                  placeholder="Enter restaurant name (e.g., Pizza Planet)" 
                  required
                />
              </div>

              {/* Restaurant Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Restaurant Location
                </label>        
                <input 
                  type="text" 
                  name='location' 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200" 
                  placeholder="Enter location (e.g., Dhanmondi, Dhaka)" 
                  required
                />
              </div>
              
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Rating (1-5)
                </label>        
                <select 
                  name='rating' 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200"
                  required
                >
                  <option value="" className="text-gray-500 dark:text-gray-400">Select your rating</option>
                  <option value="1" className="text-gray-900 dark:text-white">1 - Poor</option>
                  <option value="2" className="text-gray-900 dark:text-white">2 - Fair</option>
                  <option value="3" className="text-gray-900 dark:text-white">3 - Good</option>
                  <option value="4" className="text-gray-900 dark:text-white">4 - Very Good</option>
                  <option value="5" className="text-gray-900 dark:text-white">5 - Excellent</option>
                </select>
              </div>
              
              {/* Review Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Your Review
                </label>
                <textarea  
                  name='review' 
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical transition-colors duration-200" 
                  placeholder="Write your detailed review here... Share your experience about the taste, service, ambiance, and overall impression."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                >
                  Add Review
                </button>
              </div>

              {/* User Info Display */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Reviewing as: <span className="font-semibold text-gray-900 dark:text-white">{user?.displayName || 'Anonymous'}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                  {user?.email}
                </p>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
              Tips for a Great Review
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li>Be specific about what you liked or disliked</li>
              <li>Mention the taste, presentation, and service quality</li>
              <li>Include details about portion size and value for money</li>
              <li>Be honest and constructive in your feedback</li>
            </ul>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default AddReview;