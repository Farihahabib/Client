import { h } from 'preact';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayouts = () => {
    return (
       <div className="bg-background text-foreground transition-colors duration-200 min-h-screen">
         <Navbar />
         <div className='max-w-screen-2xl mx-auto w-full flex-1'>
           <Outlet />
         </div>
         <Footer />
       </div>
    );
};

export default MainLayouts;