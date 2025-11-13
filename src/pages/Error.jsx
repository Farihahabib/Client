import React from 'react';
import MyLink from '../Components/MyLink';
import error from '../assets/error.png';
const Error = () => {
    return (
        <>
        <title> Error</title>
        <div className=' flex flex-col justify-center items-center'>
            <img src={error} alt="errorimage" className=' rounded-3xl' />
           <MyLink to={'/'}><button  className='btn'> Go to Home</button></MyLink> 
        </div>
        
        
        </>
    );
};

export default Error;