import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import MyContainer from '../Components/MyContainer';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import { FaHeart, FaStar, FaMapMarkerAlt, FaUser, FaClock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const FavoriteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteDetail = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`/myfavorites/${id}`);
                setReview(response.data.result);
                setError(null);
            } catch (err) {
                console.error('Error fetching favorite detail:', err);
                setError(err.response?.data?.message || 'Failed to load favorite details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchFavoriteDetail();
        }
    }, [id, axiosSecure]);
    
    // Handle loading state
    if (loading) {
        return (
            <MyContainer>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4500] mx-auto mb-4"></div>
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Loading your favorite...</h2>
                    </div>
                </div>
            </MyContainer>
        );
    }

    // Handle error state
    if (error) {
        return (
            <MyContainer>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <FaHeart className="text-6xl text-red-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Favorite</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <div className="space-x-4">
                            <button 
                                className="btn bg-[#FF4500] hover:bg-[#E03E00] text-white px-6 py-2 rounded-lg"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                            <button 
                                className="btn bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                                onClick={() => navigate('/MyFavourite')}
                            >
                                <FaArrowLeft className="mr-2" />
                                Back to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </MyContainer>
        );
    }

    // Handle not found state
    if (!review) {
        return (
            <MyContainer>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <FaHeart className="text-6xl text-red-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">Favorite Not Found</h2>
                        <p className="text-gray-600 mb-4">This favorite doesn't exist or has been removed.</p>
                        <button 
                            className="btn bg-[#FF4500] hover:bg-[#E03E00] text-white px-6 py-2 rounded-lg"
                            onClick={() => navigate('/MyFavourite')}
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Favorites
                        </button>
                    </div>
                </div>
            </MyContainer>
        );
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-200" />);
        }
        
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
        }
        
        return stars;
    };

    return (
        <MyContainer>
            <div className="min-h-screen py-8">
                {/* Header with back button */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate('/MyFavourite')}
                        className="flex items-center text-[#FF4500] hover:text-[#E03E00] transition-colors duration-200 mb-4"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to My Favorites
                    </button>
                    
                    <div className="flex items-center mb-2">
                        <FaHeart className="text-red-500 text-2xl mr-3 animate-pulse" />
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Favorite Review</h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">A special dish that captured your heart</p>
                </div>

                {/* Main content card */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    
                    {/* Hero image section */}
                    <div className="relative h-80 md:h-96 overflow-hidden">
                        <img 
                            src={review.photo} 
                            alt={review.foodName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                {review.foodName}
                            </h2>
                            <div className="flex items-center text-white/90">
                                <FaMapMarkerAlt className="mr-2" />
                                <span className="text-lg">{review.restaurantName}</span>
                            </div>
                        </div>
                        
                        {/* Favorite badge */}
                        <div className="absolute top-6 right-6">
                            <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg">
                                <FaHeart className="mr-2" />
                                <span className="font-semibold">Favorite</span>
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            
                            {/* Left column - Restaurant & Location Info */}
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                        <FaMapMarkerAlt className="text-[#FF4500] mr-3" />
                                        Restaurant Details
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Restaurant Name</label>
                                            <p className="text-lg font-semibold text-gray-800 dark:text-white">{review.restaurantName}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                                            <p className="text-lg text-gray-700 dark:text-gray-300">{review.restaurantLocation}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating section */}
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg border border-yellow-200 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                        <FaStar className="text-yellow-500 mr-3" />
                                        Rating
                                    </h3>
                                    
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-1">
                                            {renderStars(review.reviewer?.rating || 0)}
                                        </div>
                                        <span className="text-2xl font-bold text-[#FF4500]">
                                            {review.reviewer?.rating || 'N/A'}/5
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right column - Reviewer & Review Info */}
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                        <FaUser className="text-[#FF4500] mr-3" />
                                        Reviewer Information
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviewer Name</label>
                                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                                {review.reviewer?.name || 'Anonymous'}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                                <FaEnvelope className="mr-2" />
                                                Email
                                            </label>
                                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                                {review.created_by || 'Not available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Date section */}
                                <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-200 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                                        <FaClock className="text-blue-500 mr-3" />
                                        Review Date
                                    </h3>
                                    
                                    <p className="text-lg text-gray-700 dark:text-gray-300">
                                        {review.created_at ? new Date(review.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'Date not available'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Review text section */}
                        {review.reviewer?.review && (
                            <div className="mt-8 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                                    "What made this dish special"
                                </h3>
                                
                                <div className="relative">
                                    <div className="absolute top-0 left-0 text-6xl text-[#FF4500] opacity-20 font-serif">"</div>
                                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 pl-12 pr-8 italic">
                                        {review.reviewer.review}
                                    </p>
                                    <div className="absolute bottom-0 right-0 text-6xl text-[#FF4500] opacity-20 font-serif transform rotate-180">"</div>
                                </div>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="mt-8 flex justify-center space-x-4">
                            <button 
                                onClick={() => navigate('/MyFavourite')}
                                className="bg-[#FF4500] hover:bg-[#E03E00] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center shadow-lg"
                            >
                                <FaHeart className="mr-2" />
                                View All Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MyContainer>
    );
};

export default FavoriteDetail;