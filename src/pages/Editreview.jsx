import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { AuthContext } from '../Context/AuthContext';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import MyContainer from '../Components/MyContainer';
import useAxiosSecure from '../Hooks/useAxiosSequire';

const Editreview = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const review = data.result;

  const handleEditReview = async (e) => {
    e.preventDefault();
    
    const form = {
      photo: e.target.photoURL.value,
      foodName: e.target.displayFoodName.value,
      restaurantName: e.target.displayResName.value,
      restaurantLocation: e.target.location.value,
      reviewer: {
        name: user?.displayName || review.reviewer.name,
        rating: parseFloat(e.target.rating.value),
        review: e.target.review.value,
        email: user?.email || review.reviewer.email,
        photoURL: user?.photoURL || review.reviewer.photoURL
      },
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await axiosSecure.put(`/reviews/${review._id}`, form);
      if (response.data.success) {
        toast.success('Review updated successfully');
        navigate('/MyReviews');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update review. Please try again.');
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen py-8">
      <MyContainer>
        <div className="max-w-2xl mx-auto">
          <h1 className='text-4xl font-bold text-center mb-8 text-foreground'>Edit Your Review</h1>
          
          {/* Preview Card */}
          <div className="bg-card border border-border rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Current Review Preview</h2>
            <div className="flex gap-4">
              <img 
                src={review.photo} 
                alt={review.foodName}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">{review.foodName}</h3>
                <p className="text-muted-foreground">{review.restaurantName}</p>
                <p className="text-muted-foreground">{review.restaurantLocation}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${i < review.reviewer.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({review.reviewer.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className='bg-card border border-border rounded-lg shadow-lg p-8'>
            <form onSubmit={handleEditReview} className='space-y-6'>
              
              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">Food Name</label>        
                <input 
                  type="text" 
                  name='displayFoodName' 
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                  defaultValue={review.foodName}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">Food Photo URL</label>
                <input 
                  type="url" 
                  name='photoURL'  
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                  defaultValue={review.photo}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">Restaurant Name</label>        
                <input 
                  type="text" 
                  name='displayResName' 
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                  defaultValue={review.restaurantName}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">Restaurant Location</label>        
                <input 
                  type="text" 
                  name='location' 
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                  defaultValue={review.restaurantLocation}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">Rating (1-5)</label>        
                <select 
                  name='rating' 
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  defaultValue={review.reviewer.rating}
                  required
                >
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">Your Review</label>
                <textarea  
                  name='review' 
                  rows="5"
                  className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical" 
                  defaultValue={review.reviewer.review}
                  placeholder="Write your detailed review here..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button 
                  type="submit"
                  className='btn flex-1 font-semibold py-3 px-6'
                >
                  Update Review
                </button>
                <button 
                  type="button"
                  onClick={() => navigate('/MyReviews')}
                  className='flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold py-3 px-6 rounded-md transition-colors duration-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};
    


export default Editreview;