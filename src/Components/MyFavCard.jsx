import { useState } from 'react';
import MyLink from './MyLink';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSequire';
import { FaTrash, FaTimes } from 'react-icons/fa';

const MyFavCard = ({ reviews, onRemove }) => {
    const { _id, photo, foodName, restaurantName, restaurantLocation, reviewer } = reviews;
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleRemoveFromFavourites = async () => {
        try {
            setLoading(true);
            await axiosSecure.delete(`/myfavourites/${_id}`);
            toast.success('Removed from favourites');
            setShowModal(false);
            if (onRemove) onRemove(); // Refresh the list
        } catch (err) {
            console.error(err);
            toast.error('Failed to remove from favourites');
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <div className='shadow-xl mx-9 transition ease-in-out hover:scale-104 rounded-xl overflow-hidden bg-white dark:bg-gray-800'>
                <div className="img h-48 rounded-t-2xl overflow-hidden">
                    <img src={photo} alt="food image" className='w-full h-48 object-cover' />
                </div>
                <div className="text p-4">
                    <h2 className='text-xl font-semibold text-[#FF4500] hover:font-bold'>{foodName}</h2>
                    <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Restaurant: {restaurantName}</p>
                    <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Location: {restaurantLocation}</p>
                    <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Reviewer: {reviewer?.name}</p>
                    <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Rating: {reviewer?.rating}</p>
                </div>
                <div className="btns flex gap-3 mx-auto justify-center mb-2">
                    <MyLink to={`/favoritedetails/${_id}`}>
                        <button className="btn p-1 hover:text-white">View Details</button>
                    </MyLink>
                    <button 
                        className="btn btn-error p-1 hover:text-white"
                        onClick={openModal}
                        disabled={loading}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Remove from Favorites
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <img 
                                    src={photo} 
                                    alt={foodName}
                                    className="w-16 h-16 object-cover rounded-lg mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">{foodName}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{restaurantName}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Are you sure you want to remove this item from your favorites? This action cannot be undone.
                            </p>
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleRemoveFromFavourites}
                                disabled={loading}
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Removing...
                                    </>
                                ) : (
                                    <>
                                        <FaTrash className="mr-2" />
                                        Remove
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyFavCard;