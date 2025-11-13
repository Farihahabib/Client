import React, { useState } from 'react';
import MyContainer from './MyContainer';
import MyLink from './MyLink';

const MyReviewCard = ({reviews}) => {
        const {_id, photo ,foodName,restaurantName,restaurantLocation,reviewer,created_at,created_by} = reviews;
       const handledeletebtn = ()=>{
        fetch(`http://localhost:3100/reviews/${_id}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json',
            },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{
            console.error(err)
        })
       }
    return (
       <>
       <MyContainer>
       <div className="p-2 transition ease-in  hover:scale-101 container grid grid-cols-6 gap-3 w-full shadow-lg justify-center items-center my-4">
        <img src={photo} alt="" className='rounded-3xl h-30 w-40' />
        <h2 className='text-xl hover:font-bold font-semibold text-[#FF4500]'> {foodName}</h2>
        <h2 className='text-xl hover:font-bold font-semibold'> {restaurantName}</h2>
        <h2 className='text-xl hover:font-bold font-semibold'> {created_at}</h2>
   <MyLink to={`/editreview/${_id}`}>  <button className="btn px-18 hover:text-white ">Edit</button></MyLink> 
<button className="btn  hover:text-white " onClick={()=>document.getElementById('my_modal_5').showModal()}>Delete</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   <p className="py-4">If you want to delete this ,pls confirm</p>
    <div className="modal-action">
        <div className='flex gap-5'>
            <button onClick={handledeletebtn} className="btn">Confirm</button>
      <form method="dialog" className='flex gap-6'>
        <button className="btn">cancel</button>
      </form>
      </div>
    </div>
  </div>
</dialog>
       </div>
       </MyContainer>
       </>
    );
};

export default MyReviewCard;