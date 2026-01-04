import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../Hooks/useAuth'

import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import ModeratorMenu from './Menu/ModeratorMenu'
import UserMenu from './Menu/UserMenu'
 import useRole from '../../../Hooks/useRole'
 import logo from '../../../assets/foodlovers.png'
// Icons
 import { GrLogout } from 'react-icons/gr'
 import { CgProfile } from 'react-icons/cg'
 import { AiOutlineBars } from 'react-icons/ai'
 import { BsGraphUp } from 'react-icons/bs'

// User Menu
// import MenuItem from './Menu/MenuItem'
// import AdminMenu from './Menu/AdminMenu'
// import StudentsMenu from './Menu/StudentsMenu'
// import useRole from '../../../Hooks/useRole'
// import ModeratorMenu from './Menu/ModeratorMenu'

const Sidebar = () => {
  const { logout } = useAuth()
  const [isActive, setActive] = useState(false)
 const [role,isRoleLoading] = useRole();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
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

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          <div>
            {/* Logo */}
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
              <Link to='/' className='flex gap-2 justify-center items-center'>
                <img src='/logo.png' alt='logo' width='50' height='50' className='h-full w-50% rounded-5xl' />
                <span className='font-bold text-blue-900'>FoodloversNetwork</span>
              </Link>
            </div>
          </div>
                {/* Top Content */}
            <div className='border-b-4'>
            <hr />

            <MenuItem
              icon={CgProfile}
              label='Profile'
              address='/dashboard/profile'
            />
            <button
              onClick={handleSignout}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />

              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
          {/* Middle Content */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/*  Menu Items */}
            <nav>
              {/* Role-Based Menu */}
           
          
           {role === 'Admin' && <AdminMenu /> }   
           {role === 'Moderator' && <ModeratorMenu /> }   
           {role === 'User' &&  <UserMenu /> }   
            </nav>
          </div>

         
        </div>
      </div>
    </>
  )
}

export default Sidebar
