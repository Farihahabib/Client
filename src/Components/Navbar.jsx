import { useContext, useState } from 'preact/hooks';
import logo from '../assets/foodlovers.png';
import MyContainer from './MyContainer';
import DarkModeToggle from './DarkModeToggle';
import ProfileImage from './ProfileImage';
import { DotLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import MyLink from './MyLink';

const Navbar = () => {
  const { user, setUser, logout, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignout = () => {
    logout()
      .then(() => {
        toast.success("logout successful");
        navigate("/login")
        setUser(null);
        setLoading(false);
        setDropdownOpen(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="bg-[#FF7F50] dark:bg-gray-800 py-4 border-b sticky top-0 z-50 border-b-slate-300 dark:border-gray-700 transition-colors duration-200">
        <MyContainer className="flex flex-col md:flex-row lg:flex-row gap-3 items-center md:justify-between container mx-auto">
          <figure className='flex items-center gap-1.5 ml-4'>
            <img src={logo} className="w-[60px] rounded-3xl" />
          </figure>
          
          <ul className="flex items-center gap-8 mr-3 py-2">
            <li><MyLink to={"/"}>Home</MyLink></li>
            <li><MyLink to={"/AllReview"}>All Reviews</MyLink></li>
            {user && (<li><MyLink to={"/AddReview"}>Add Review</MyLink></li>)}
            {user && (<li><MyLink to={"/MyReviews"}>My Reviews</MyLink></li>)}
            {user && (<li><MyLink to={"/MyFavourite"}>My Favourites</MyLink></li>)}
            {user && (<li><MyLink to={"/dashboard"}>Dashboard</MyLink></li>)}
          </ul>
          
          {loading ? (
            <DotLoader />
          ) : user ? (
            <div className='flex gap-2 justify-center items-center relative'>
              <DarkModeToggle />
              <button 
                className="focus:outline-none" 
                onClick={toggleDropdown}
              >
                <ProfileImage
                  src={user?.photoURL}
                  alt="User profile"
                  size="h-12 w-12"
                  className="mx-auto mr-5 hover:ring-2 hover:ring-white transition-all duration-200"
                  name={user?.displayName}
                  showBorder={false}
                />
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={closeDropdown}
                  ></div>
                  
                  {/* Dropdown Content */}
                  <div className="absolute top-full right-0 mt-2 w-52 rounded-lg bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                    <div className="p-4 bg-[#FFA07A] dark:bg-gray-600 rounded-t-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <ProfileImage
                          src={user?.photoURL}
                          alt="User profile"
                          size="h-10 w-10"
                          name={user?.displayName}
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {user?.displayName || 'User'}
                          </p>
                          <p className="text-xs text-white/80 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <MyLink 
                        to={"/AddReview"} 
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={closeDropdown}
                      >
                        Add Review
                      </MyLink>
                      <MyLink 
                        to={"/MyReviews"} 
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={closeDropdown}
                      >
                        My Reviews
                      </MyLink>
                      <MyLink 
                        to={"/MyFavourite"} 
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={closeDropdown}
                      >
                        My Favorites
                      </MyLink>
                      <MyLink 
                        to={"/dashboard"} 
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={closeDropdown}
                      >
                        Dashboard
                      </MyLink>
                      
                      <hr className="my-2 border-gray-200 dark:border-gray-600" />
                      
                      <button 
                        onClick={handleSignout}
                        className='w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
                      >
                        {loading ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className='flex gap-2 items-center'>
              <DarkModeToggle />
              <MyLink to={"/login"}>
                <button className='btn px-12 text-white'>Login</button>
              </MyLink>
            </div>
          )}
        </MyContainer>
      </div>
    </>
  );
};

export default Navbar;