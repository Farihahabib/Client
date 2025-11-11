import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const MainLayouts = () => {
    return (
       <>

      <Navbar />
       <div className='max-w-screen-2xl  mx-auto w-full  flex-1'>
       <Outlet />
  </div>
       <Footer />
   
       </>
    );
};

export default MainLayouts;