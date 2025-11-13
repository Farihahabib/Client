import React, { useContext, useRef, useState } from 'react';

import { FaEye, FaGoogle } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { IoEyeOff } from 'react-icons/io5';

import { toast } from 'react-toastify';
import MyContainer from '../Components/MyContainer';
import {} from '../Firebase/firebase.config';
import { AuthContext } from '../Context/AuthContext';




const Login = () => {
    const navigate = useNavigate();
    const [show , setshow]=useState(false);

    const{user, setUser,signInWithEmailAndPasswordFunc,signinwithgooglefunc,setLoading} = useContext(AuthContext)
const location = useLocation()
const from = location.state || "/";
if (user){
  navigate("/")
}
console.log(location)
    const emailRef =useRef();
    const handlelogin = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        console.log("logged in",{email,password})
  
signInWithEmailAndPasswordFunc(email,password).then((res)=>{
    console.log(res.user);
    setUser(res.user);
    toast.success(" Successfully Logged In")
    navigate(from);
  
}).catch((e)=>{
if(e.code === "auth/email-already-in-use")
    {
        toast.error("Email already in use. Please use a different email.");
    }
    else if(e.code === "auth/invalid-email")
    {
        toast.error("Invalid email format. Please enter a valid email.");
    }
    else if(e.code === "auth/weak-password")
    {
        toast.error("Use atleast 6 character for password.");
    }
    else{
        toast.error(e.message);
    }

setLoading(false);
}
)
 
}

const handlegooglelogin = (e)=>{
    e.preventDefault();
      console.log("google login")

signinwithgooglefunc()
.then((res)=>{
    console.log(res);
    setUser(res.user);
    setLoading(false);
    navigate(from);
    toast.success(" Successfully Logged In")
}).catch((e)=>{
    if (e.code === "auth/popup-closed-by-user") {
      toast.error("Login cancelled. Please try again.");
    } 
    else if (e.code === "auth/network-request-failed") {
      toast.error("Network error. Check your internet connection.");
    } 
    else if (e.code === "auth/user-disabled") {
      toast.error("This account has been disabled. Contact support.");
    } 
    else if (e.code === "auth/account-exists-with-different-credential") {
      toast.error("This email is already used with another login method.");
    } 
    else {
      toast.error(e.message || "Something went wrong. Please try again.");
    }
})
}
const handleforgetpassword = (e)=>{
    const email= emailRef.current.value;
    e.preventDefault();
    navigate("/Fpassword",{state:{email}});
console.log(emailRef.current.value)


}
    return (
        <>
            <title>FoodloversNetwork - Login</title>
        <MyContainer>
        <div className='flex  items-center justify-center container mx-auto py-12'>
      
    
      <form onSubmit={handlelogin} className="fieldset shadow-2xl border-base-300 bg-[#FF7F50] rounded-box w-xs border  p-4">
       
  <h1 className="fieldset-legend pt-5 flex justify-center items-center text-xl text-white font-bold">Login</h1>
  
  <div>
  <label className="label font-bold ">Email</label>
  <input
   type="email"
    name='email'
    ref={emailRef}
    className="input bg-teal-50" 
    placeholder="Email" />
</div>
  <div className='relative'>
    <label className="label font-bold ">Password</label>
    <input type={show ? "text" :"password" } name='password'  className="input bg-teal-50 h-7" placeholder="Password" />
    <span onClick={()=>setshow(!show)} className=' absolute right-2  top-[26px] z-50'>{show ? <FaEye /> : <IoEyeOff />}</span>
  </div>
<button onClick={handleforgetpassword} type='button' className='hover:underline cursor-pointer'>ForgetPassword?</button>
  <button className="btn btn-neutral bg-teal-800 mt-4">Login</button>

  <button onClick={handlegooglelogin} className="btn btn-neutral bg-teal-600 border-none mt-4"><div className='flex gap-2 items-center justify-center'><FaGoogle />Continue With Google</div></button>
  <p className='text-white font-bold text-center py-3'>Can't have an account?<NavLink to={'/Register'}><button className='border-b'>...Register Now</button></NavLink> </p>
 
</form>

 </div>
 </MyContainer>
        </>
    );
};

export default Login;