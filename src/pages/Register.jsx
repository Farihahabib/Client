import React, {  useContext, useState } from 'react';

import { FaEye, FaGoogle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';


import { toast } from 'react-toastify';
import { IoEyeOff } from 'react-icons/io5';
import { AuthContext } from '../Context/AuthProvider';
import MyContainer from '../Components/MyContainer';




const Register = () => {
     const navigate = useNavigate();
    const{createuserWithEmailAndPasswordFunc, updateprofileFunc,user,setUser,signinwithgooglefunc,setLoading} = useContext(AuthContext)
    const [show,setshow] = useState(false);
   console.log("register user", user)
    const handleregister = (e)=>{
e.preventDefault();
const displayName = e.target.displayName?.value;
const email = e.target.email?.value;
const password = e.target.password?.value;
const photoURL = e.target.photoURL?.value || "https://via.placeholder.com/88";
console.log("registered",{displayName,email})
    
const re = /^(?=.{6,64}$)(?=.*[a-z])(?=.*[A-Z]).*$/;
if (!re.test(password)){
    toast.error("Password must contain at least one uppercase letter, one lowercase letter and atleast 6 character.");
    return
}

createuserWithEmailAndPasswordFunc(email,password).then((res)=>{
    console.log(res)
    setUser(res.user);
updateprofileFunc( displayName, photoURL)
.then(()=>{
    setLoading(false);
          toast.success("Registration Successful")
           navigate("/")});
})
         
.catch((e)=>{
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
    setLoading(false)
})
    }
    const handlegoogleregister = (e)=>{
signinwithgooglefunc().then((res)=>{
console.log(res);
console.log(e)
setUser(res.user);
navigate("/");
toast.success(" Successfully Registered with Google")
})
.catch((e)=>{
    toast.error(e.message);
})
    }
    
    return (
        <>
            <title>ToyTopia - Registration</title>
                <MyContainer>
        <div className='flex  items-center justify-center container mx-auto py-12'>
      
    
      <form onSubmit={handleregister} className="fieldset shadow-2xl border-base-300 bg-teal-400 rounded-box w-xs border  p-4">
       
  <h1 className="fieldset-legend pt-5 flex justify-center items-center text-xl text-white font-bold">Register Now</h1>

  <label className="label font-bold ">Name</label>
  <input type="text" name='displayName' className="input bg-teal-50 h-7" placeholder="Your Name" />
  <label className="label font-bold ">Photo</label>
  <input type="text"  name='photoURL'  className="input bg-teal-50 h-7" placeholder="choose a photo" />

  <label className="label font-bold ">Email</label>
  <input type="email"  name='email'  className="input bg-teal-50 h-7 text-gray-400" placeholder="Email" />
  <div className='relative'>
  <label className="label font-bold ">Password</label>
  <input type={show ? "text" :"password" } name='password'  className="input bg-teal-50 h-7" placeholder="Password" />
  <span onClick={()=>setshow(!show)} className=' absolute right-2  top-[26px] z-50'>{show ? <FaEye /> : <IoEyeOff />}</span>
</div>
  <button className="btn btn-neutral bg-teal-800 mt-4">Submit</button>

  <button onClick={handlegoogleregister} className="btn btn-neutral bg-teal-600 border-none mt-4"><FaGoogle />Continue With Google</button>
  <p className='text-white font-bold text-center py-3'>Already have an account? <NavLink to={'/login'}> <button className='border-b'>Login</button></NavLink> </p>
 
</form>

 </div>
 </MyContainer>
        
        </>
    )
}

export default Register;