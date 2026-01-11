import React from 'react';
import { NavLink } from 'react-router-dom';

const MyLink = ({ to, children, className = "", showActiveIndicator = true }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => {
        const baseClasses = "text-white dark:text-gray-200 hover:text-gray-200 dark:hover:text-white transition-all duration-300 relative";
        const activeClasses = showActiveIndicator 
          ? isActive 
            ? "font-semibold after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[3px] after:bg-white dark:after:bg-gray-200 after:rounded-full" 
            : "hover:after:content-[''] hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:right-0 hover:after:h-[2px] hover:after:bg-gray-300 dark:hover:after:bg-gray-400 hover:after:rounded-full"
          : isActive 
            ? "border-b-2 border-white dark:border-gray-200 pb-1 font-semibold" 
            : "border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-400 pb-1";
        
        return `${baseClasses} ${activeClasses} ${className}`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default MyLink;