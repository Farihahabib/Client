import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';

import { DotLoader } from 'react-spinners';
import { AuthContext } from '../Context/AuthProvider';

const Privateroute = ({children}) => {
const {user,loading}=useContext(AuthContext);
const location = useLocation()
console.log(location)
if( loading){
 return(
 <div className='h-[97vh] flex items-center justify-center'>
    <DotLoader color='#e74c3c'  />
    </div> )
}
if(!user){
    return <Navigate to="/login" replace={true} state={location.pathname}></Navigate>
}

    return children
};

export default Privateroute;