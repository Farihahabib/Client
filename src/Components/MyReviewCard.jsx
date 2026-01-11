import { h } from 'preact';
import MyLink from './MyLink';

const MyReviewCard = ({ reviews, onDelete }) => {
    const { _id, photo, foodName, restaurantName, restaurantLocation, reviewer } = reviews;
    console.log(_id)
    return (
        <div className='shadow-xl mx-9 transition ease-in-out hover:scale-104 rounded-xl overflow-hidden bg-white dark:bg-gray-800'>
            <div className="img h-48 rounded-t-2xl overflow-hidden">
                <img src={photo} alt="food image" className='w-full h-48 object-cover' />
            </div>
            <div className="text p-4">
                <h2 className='text-xl font-semibold text-[#FF4500] hover:font-bold'>{foodName}</h2>
                <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Restaurant: {restaurantName}</p>
                <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Location: {restaurantLocation}</p>
                <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Reviewer: {reviewer?.name}</p>
                <p className='text-md font-semibold text-gray-700 dark:text-gray-300'>Rating: {reviewer?.rating}/5</p>
                
                {/* Review Text */}
                <div className="mt-3">
                    <h4 className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1'>Review:</h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3'>
                        {reviewer?.review || "No review text available"}
                    </p>
                </div>
            </div>
            <div className="btns flex gap-3 mx-auto justify-center mb-2">
                <MyLink to={`/reviewdetails/${_id}`}>
                    <button className="btn p-1 hover:text-white">View Details</button>
                </MyLink>
                <MyLink to={`/editreview/${_id}`}>
                    <button className="btn p-1 hover:text-white">Edit</button>
                </MyLink>
            </div>
        </div>
    );
};

export default MyReviewCard;