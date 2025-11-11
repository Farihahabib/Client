import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to,className, children}) => {
    return (
        <NavLink 
        to={to}
         className={({ isActive })=>
            isActive ?"text-white  border-b-3 font-bold" : `${className} font-semibold text-white`} >
            {children}
            </NavLink>
    );
};
export default MyLink;