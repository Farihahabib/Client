import React, {  useContext } from 'react';
import logo from '../assets/foodlovers.png';
import MyContainer from './MyContainer';

import { NavLink} from 'react-router';
import { DotLoader} from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvider';
import MyLink from './MyLink';
import { FaHome } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { MdReviews } from 'react-icons/md';

const Navbar = () => {
    const { user,setUser, logout, loading ,setLoading } =
  useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate(); 
 const handleSignout = () => {
    logout()
           .then(() => {
        toast.success("logout successful");
navigate("/login")
        setUser(null);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
console.log(loading);
 
    return (
       <>
        <div className="bg-[#FF7F50] py-2 border-b container border-b-slate-300  mx-auto ">
            <MyContainer className=" flex flex-col md:flex-row lg:flex-row gap-3 items-center md:justify-between container mx-auto ">
     <figure className='flex items-center gap-1.5 ml-4'>
              <img src={logo} className="w-[60px] rounded-4xl" />
              {/* <h3 className='font-bold  text-white text-xl'>Foodlovers Network</h3> */}
     </figure>
         <ul className="flex items-center gap-4  mr-3">
           <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
        <li> <MyLink to={"/AllReview"} >All review</MyLink></li> 

              {user && (<li>
                <MyLink to={"/AddReview"}>Add Review</MyLink>
              </li>)}
              {user && (<li>
                <MyLink to={"/MyReview"}>My Review</MyLink>
              </li>)}
         </ul>
         {loading ?
         (<DotLoader  />) :
         user ?
        <div className='flex gap-2'>
<button className="" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } }>
 <img src={user?.photoURL|| "https://via.placeholder.com/88"}
   className="h-12 w-12 rounded-full mx-auto mr-5" 
   alt="user " />
</button>
<div className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm left-1/14 -translate-x-1/2 "
  popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }  }>
  <div className="p-4 bg-[#FFA07A]  flex flex-col items-center gap-2 m-0">
<MyLink to={"/AddReview"} className="hover:border-b hover:font-semibold ">Add Review</MyLink>
<MyLink to={"/MyReview"} className="hover:border-b hover:font-semibold ">My Review</MyLink>
<MyLink to={"/Favouritereviews"} className="hover:border-b hover:font-semibold ">My Favorites</MyLink>
 <button onClick={handleSignout} 
     className=' btn px-12  text-white'>{loading ? "Logging out..." : "Logout" }</button>
     </div>
</div>
   </div>   
         :
<NavLink to={"/login"}>
<button className="btn text-white mr-5">Login</button>
</NavLink>
}

</MyContainer>
         
    </div>
  
       </>
    );
};

export default Navbar;