import { useState, useEffect } from 'preact/hooks';
import { useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import { toast } from 'react-toastify';
import MyContainer from '../Components/MyContainer';
import { FaStar, FaMapMarkerAlt, FaUser, FaCalendarAlt, FaEnvelope, FaClock, FaUtensils } from 'react-icons/fa';

const ReviewDetail = () => {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchReview = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`/reviews/${id}`);
                setReview(response.data?.result || response.data);
            } catch (error) {
                console.error('Error fetching review:', error);
                setError('Failed to load review details');
                toast.error('Failed to load review details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchReview();
        }
    }, [id, axiosSecure]);
    
    // Handle loading state
    if (loading) {
        return (
            <MyContainer>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">Loading...</h2>
                    </div>
                </div>
            </MyContainer>
        );
    }

    // Handle error or no review
    if (error || !review) {
        return (
            <MyContainer>
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">Review Not Found</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">The review you're looking for doesn't exist or has been removed.</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Debug info: Looking for review with ID: {id}</p>
                        <button 
                            className="btn btn-primary mt-4"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </MyContainer>
        );
    }

    console.log(review);

    // Helper function to format date
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Unknown';
        
        try {
            let date;
            if (typeof dateStr === 'string' && dateStr.includes('/') && !dateStr.includes('T')) {
                const parts = dateStr.split('/');
                if (parts.length === 3) {
                    date = new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
                } else {
                    date = new Date(dateStr);
                }
            } else {
                date = new Date(dateStr);
            }
            
            if (isNaN(date.getTime())) {
                return dateStr; // Return original if can't parse
            }
            
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateStr;
        }
    };

    // Generate star rating display
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-300" />);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
        }
        
        return stars;
    };
    
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
            <MyContainer>
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section with Food Image */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                        <div className="relative h-96 bg-linear-to-r from-orange-400 to-red-500">
                            {review.photo ? (
                                <img 
                                    src={review.photo} 
                                    alt={review.foodName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FaUtensils className="text-white text-6xl opacity-50" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                            
                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {review.foodName || 'Unknown Dish'}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-lg">
                                    <div className="flex items-center">
                                        <FaUtensils className="mr-2" />
                                        <span>{review.restaurantName || 'Unknown Restaurant'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="mr-2" />
                                        <span>{review.restaurantLocation || 'Unknown Location'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Review Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Rating Section */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        Overall Rating
                                    </h2>
                                    <div className="flex justify-center items-center gap-2 mb-4">
                                        {review.reviewer?.rating ? renderStars(review.reviewer.rating) : (
                                            <span className="text-gray-500 dark:text-gray-400">No rating</span>
                                        )}
                                    </div>
                                    <div className="text-4xl font-bold text-orange-500 mb-2">
                                        {review.reviewer?.rating || 'N/A'}
                                        {review.reviewer?.rating && <span className="text-2xl text-gray-500">/5</span>}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {review.reviewer?.rating >= 4.5 ? 'Excellent' :
                                         review.reviewer?.rating >= 4 ? 'Very Good' :
                                         review.reviewer?.rating >= 3 ? 'Good' :
                                         review.reviewer?.rating >= 2 ? 'Fair' : 'Poor'}
                                    </p>
                                </div>
                            </div>

                            {/* Review Text */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <FaUser className="mr-3 text-orange-500" />
                                    Review
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                        "{review.reviewer?.review || 'No review text provided'}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Reviewer Info & Details */}
                        <div className="space-y-6">
                            {/* Reviewer Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Reviewer Information
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
                                            <FaUser className="text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {review.reviewer?.name || 'Anonymous'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Reviewer</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                                            <FaEnvelope className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {review.reviewer?.email || review.created_by || 'Not provided'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Review Details */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Review Details
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                                            <FaCalendarAlt className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {formatDate(review.created_at)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Review Date</p>
                                        </div>
                                    </div>
                                    
                                    {review.updated_at && review.updated_at !== review.created_at && (
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                                                <FaClock className="text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {formatDate(review.updated_at)}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="space-y-3">
                                    <button 
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                                        onClick={() => window.history.back()}
                                    >
                                        ← Go Back
                                    </button>
                                    <button 
                                        className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                                        onClick={() => window.location.href = '/AllReview'}
                                    >
                                        View All Reviews
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default ReviewDetail;