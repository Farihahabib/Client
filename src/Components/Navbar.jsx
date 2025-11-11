import React, {  useContext } from 'react';
import logo from '../assets/foodlovers.png';
import MyContainer from './MyContainer';

import { NavLink} from 'react-router';
import { DotLoader} from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvider';
import MyLink from './MyLink';

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
        <div className="bg-[#FF7F50] py-2 border-b container border-b-slate-300 ">
            <MyContainer className="flex items-center justify-between  ">
     <figure className='flex items-center gap-1.5'>
              <img src={logo} className="w-[45px] rounded-4xl" />
              <h3 className='font-bold  text-white text-xl'>Foodlovers Network</h3>
     </figure>
         <ul className="flex items-center gap-2 ">
           <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
        {user &&  (<li>
            <MyLink to={"/profile"}>Profile</MyLink>
           </li>)}
         </ul>
         {loading ?
         (<DotLoader  />) :
         user ?
        <div className='flex gap-2'>
{/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
{/* For TSX uncomment the commented types below */}
<button className="" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
 <img src={user?.photoURL|| "https://via.placeholder.com/88"}
   className="h-15 w-15 rounded-full mx-auto"
   alt="user profile" />
</button>
<div>
<div className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
  popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }>
<h1 className='text-xl font-semibold'>  {user?.displayName || "Anonymous User"}</h1>
 <button onClick={handleSignout} 
     className='p-1 bg-teal-400 text-white  rounded-md font-semibold cursor-pointer px-4 py-2'>{loading ? "Logging out..." : "Logout" }</button>
</div>
</div>






            {/* <span className='absolute bottom-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-white rounded-md opacity-0 group-hover:opacity-100  transition-all font-bold duration-300 '> 
          
            </span>   */}
              </div>
   
  
             
         :
<NavLink to={"/login"}>
<button className="btn text-white">Login</button>
</NavLink>
}

</MyContainer>
         
    </div>
  
       </>
    );
};

export default Navbar;