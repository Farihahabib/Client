import { useState } from 'preact/hooks';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';
import { toast } from 'react-toastify';
import { FaStar, FaEye, FaTrash, FaSearch, FaCalendarAlt, FaUser, FaUtensils, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Fetch all reviews for moderation
  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const result = await axiosSecure.get('/reviews');
      return result.data;
    }
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId) => {
      const result = await axiosSecure.delete(`/reviews/${reviewId}`);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Review deleted successfully!');
      queryClient.invalidateQueries(['all-reviews']);
    },
    onError: (error) => {
      toast.error('Failed to delete review');
      console.error(error);
    }
  });

  const handleDeleteReview = (reviewId, foodName) => {
    setReviewToDelete({ id: reviewId, name: foodName });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (reviewToDelete) {
      deleteReviewMutation.mutate(reviewToDelete.id);
      setShowDeleteModal(false);
      setReviewToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  // Helper function to parse dates consistently
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0); // Return epoch for missing dates
    
    try {
      // Handle MM/DD/YYYY format (like "11/13/2025")
      if (typeof dateStr === 'string' && dateStr.includes('/') && !dateStr.includes('T')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          // Convert MM/DD/YYYY to YYYY-MM-DD for proper parsing
          return new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
        }
      }
      // Handle ISO format or other standard formats
      return new Date(dateStr);
    } catch (error) {
      console.error('Date parsing error:', error, 'for date:', dateStr);
      return new Date(0);
    }
  };

  // Filter and sort reviews
  const filteredAndSortedReviews = (reviews || [])
    .filter(review => {
      if (!review) return false;
      
      const reviewerName = review.reviewer?.name || review.created_by || '';
      const foodName = review.foodName || '';
      const restaurantName = review.restaurantName || '';
      
      const matchesSearch = foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reviewerName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return parseDate(b.updated_at || b.created_at || b.createdAt) - parseDate(a.updated_at || a.created_at || a.createdAt);
        case 'oldest':
          return parseDate(a.updated_at || a.created_at || a.createdAt) - parseDate(b.updated_at || b.created_at || b.createdAt);
        case 'rating-high':
          return (b.reviewer?.rating || 0) - (a.reviewer?.rating || 0);
        case 'rating-low':
          return (a.reviewer?.rating || 0) - (b.reviewer?.rating || 0);
        case 'food-name':
          return (a.foodName || '').localeCompare(b.foodName || '');
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            All Reviews Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            View and manage all user reviews across the platform
          </p>
        </div>
        
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reviews</p>
                <p className="text-3xl font-bold text-blue-600">{(reviews || []).length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <FaUtensils className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {(reviews || []).length > 0 
                    ? ((reviews || []).reduce((sum, r) => sum + (r?.reviewer?.rating || 0), 0) / (reviews || []).length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                <FaStar className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-3xl font-bold text-green-600">
                  {(reviews || []).filter(r => {
                    if (!r) return false;
                    const reviewDate = parseDate(r.updated_at || r.created_at || r.createdAt);
                    const currentDate = new Date();
                    return reviewDate.getMonth() === currentDate.getMonth() && 
                           reviewDate.getFullYear() === currentDate.getFullYear();
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Users</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set((reviews || []).map(r => r?.reviewer?.email || r?.created_by).filter(email => email && email.trim() !== '')).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FaUser className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by food name, restaurant, or reviewer..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select 
              className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white appearance-none cursor-pointer min-w-[200px]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
              <option value="food-name">Food Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">
                  Food & Restaurant
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">
                  Reviewer
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/12">
                  Rating
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/3">
                  Review
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/8">
                  Date
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedReviews.map((review, index) => (
                <tr 
                  key={review._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 bg-white dark:bg-gray-800"
                >
                  {/* Food & Restaurant */}
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 shrink-0 mr-3">
                        {review.photo ? (
                          <img 
                            src={review.photo} 
                            alt={review.foodName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaUtensils className="text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {review.foodName || 'Unknown Food'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {review.restaurantName || 'Unknown Restaurant'}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center truncate">
                          <FaMapMarkerAlt className="mr-1 shrink-0" />
                          <span className="truncate">{review.restaurantLocation || 'Unknown Location'}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Reviewer */}
                  <td className="px-4 py-4">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {review.reviewer?.name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {review.reviewer?.email || review.created_by || 'No email'}
                      </div>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {review.reviewer?.rating ? (
                        <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                          <FaStar className="text-yellow-500 mr-1 text-xs" />
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {review.reviewer.rating}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-gray-400">No rating</span>
                      )}
                    </div>
                  </td>

                  {/* Review */}
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 wrap-break-word">
                        {review.reviewer?.review || 'No review text available'}
                      </p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {(() => {
                        const dateStr = review.updated_at || review.created_at || review.createdAt;
                        if (!dateStr) return 'No date';
                        
                        try {
                          let date;
                          
                          // Handle MM/DD/YYYY format (like "11/13/2025")
                          if (typeof dateStr === 'string' && dateStr.includes('/') && !dateStr.includes('T')) {
                            const parts = dateStr.split('/');
                            if (parts.length === 3) {
                              // Convert MM/DD/YYYY to YYYY-MM-DD for proper parsing
                              date = new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
                            } else {
                              date = new Date(dateStr);
                            }
                          } else {
                            // Handle ISO format or other standard formats
                            date = new Date(dateStr);
                          }
                          
                          // Check if date is valid
                          if (isNaN(date.getTime())) {
                            return 'Invalid date';
                          }
                          
                          return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: '2-digit'
                          });
                        } catch (error) {
                          console.error('Date parsing error:', error, 'for date:', dateStr);
                          return 'Invalid date';
                        }
                      })()}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button 
                        className="inline-flex items-center px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 text-xs font-medium"
                        onClick={() => window.open(`/reviewdetails/${review._id}`, '_blank')}
                      >
                        <FaEye className="mr-1" />
                        View
                      </button>
                      <button 
                        className="inline-flex items-center px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 text-xs font-medium disabled:opacity-50"
                        onClick={() => handleDeleteReview(review._id, review.foodName)}
                        disabled={deleteReviewMutation.isLoading}
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredAndSortedReviews.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <FaSearch className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No reviews found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {searchTerm 
              ? 'Try adjusting your search criteria to find more reviews'
              : 'No reviews have been submitted yet'
            }
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Confirm Delete
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                  <FaTrash className="text-red-600 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete Review
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete the review for{' '}
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  "{reviewToDelete?.name}"
                </span>
                ? This will permanently remove the review from the system.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
                disabled={deleteReviewMutation.isLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteReviewMutation.isLoading}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteReviewMutation.isLoading ? 'Deleting...' : 'Delete Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviews;