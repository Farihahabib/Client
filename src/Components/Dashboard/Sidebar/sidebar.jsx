import { useState } from 'preact/hooks'
import { Link, useNavigate } from 'react-router'
import useAuth from '../../../Hooks/useAuth'
import { toast } from 'react-toastify'

import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import ModeratorMenu from './Menu/ModeratorMenu'
import UserMenu from './Menu/UserMenu'
import useRole from '../../../Hooks/useRole'
import logo from '../../../assets/foodlovers.png'
import DarkModeToggle from '../../DarkModeToggle'

// Icons
import { GrLogout } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineBars } from 'react-icons/ai'
import { MdDashboard } from 'react-icons/md'

const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isActive, setActive] = useState(false)
  const [role, isRoleLoading] = useRole()

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const handleSignout = () => {
    logout()
      .then(() => {
        toast.success("Logout successful");
        navigate("/login")
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className='bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex justify-between md:hidden transition-colors duration-200'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 transition-colors duration-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 dark:bg-gray-800 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition-all duration-200 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          <div>
            {/* Logo */}
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 dark:bg-gray-700 mx-auto transition-colors duration-200'>
              <Link to='/' className='flex gap-2 justify-center items-center'>
                <img src={logo} alt='logo' width='50' height='50' className='h-12 w-12 rounded-full' />
                <span className='font-bold text-blue-900 dark:text-blue-300'>FoodloversNetwork</span>
              </Link>
            </div>
          </div>
          {/* Top Content */}
          <div className='border-b-4 border-gray-300 dark:border-gray-600'>
            <hr className='border-gray-300 dark:border-gray-600' />
            <MenuItem
              icon={MdDashboard}
              label='Dashboard'
              address='/dashboard'
            />
            <MenuItem
              icon={CgProfile}
              label='Profile'
              address='/dashboard/profile'
            />
            
            {/* Theme Toggle */}
            <div className="px-4 py-2 mt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <DarkModeToggle />
              </div>
            </div>
            
            <button
              onClick={handleSignout}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
          {/* Middle Content */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Menu Items */}
            <nav>
              {/* Role-Based Menu */}
              {isRoleLoading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="loading loading-spinner loading-sm"></div>
                </div>
              ) : (
                <>
                  {role === 'Admin' && <AdminMenu />}
                  {role === 'Moderator' && <ModeratorMenu />}
                  {role === 'User' && <UserMenu />}
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar