import React, { useContext, useRef, useState } from 'react';

import { FaEye, FaGoogle } from 'react-icons/fa';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router';
import { IoEyeOff } from 'react-icons/io5';

import { toast } from 'react-toastify';
import { AuthContext,} from '../Context/AuthContext';
import {} from '../Firebase/firebase.config';
import MyContainer from '../Components/MyContainer';
import useAuth from '../Hooks/useAuth';
import { DotLoader } from 'react-spinners';
import { saveorUpdateUser } from '../Utills';

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/"

  const { user, setUser, signInWithEmailAndPasswordFunc, signinwithgooglefunc, loading, setLoading } = useAuth()

  const [show, setShow] = useState(false)
  const emailRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const { user } = await signInWithEmailAndPasswordFunc(email, password)
      await saveorUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      setUser(user)
      setLoading(false)
      navigate(from, { replace: true })
      toast.success("Login Successful")
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signinwithgooglefunc()
      await saveorUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      setUser(user)
      setLoading(false)
      navigate(from, { replace: true })
      toast.success("Login Successful")
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  if (loading) return <DotLoader />
  if (user) return <Navigate to={from} replace />



// const Login = () => {
//     const Navigate = useNavigate();
//     const [show , setshow]=useState(false);

//     const{user, setUser,signInWithEmailAndPasswordFunc,signinwithgooglefunc,setLoading} = useAuth()
// const location = useLocation()
// const from = location.state || "/";
//   if (loading) return <LoadingSpinner />
//   if (user) return <Navigate to={from} replace={true} />
// console.log(location)
//     const emailRef =useRef();
//     const handlelogin = async (e)=>{
//         e.preventDefault();
//         const email = e.target.email.value;
//         const password = e.target.password.value;

//         try {
//       //User Login
//  const {user} = await signIn(email, password)
//  await saveorUpdateUser({
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//  })

//       Navigate(from, { replace: true })
//       toast.success('Login Successful')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.message)
//     }
//   }
//    const handlegooglelogin = async () => {
//     try {
//       //User Registration using google
//  const {user}= await signInWithGoogle()
//         await saveorUpdateUser({
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//       })
//       Navigate(from, { replace: true })
//       toast.success('Login Successful')
//     } catch (err) {
//       console.log(err)
//       setLoading(false)
//       toast.error(err?.message)
//     }
//   }



// }




// const handlegooglelogin = (e)=>{
//     e.preventDefault();
//       console.log("google login")

// signinwithgooglefunc()
// .then((res)=>{
//     console.log(res);
//     setUser(res.user);
//     setLoading(false);
//     Navigate(from);
//     toast.success(" Successfully Logged In")
// }).catch((e)=>{
//     if (e.code === "auth/popup-closed-by-user") {
//       toast.error("Login cancelled. Please try again.");
//     } 
//     else if (e.code === "auth/network-request-failed") {
//       toast.error("Network error. Check your internet connection.");
//     } 
//     else if (e.code === "auth/user-disabled") {
//       toast.error("This account has been disabled. Contact support.");
//     } 
//     else if (e.code === "auth/account-exists-with-different-credential") {
//       toast.error("This email is already used with another login method.");
//     } 
//     else {
//       toast.error(e.message || "Something went wrong. Please try again.");
//     }
// })
// }
// const handleforgetpassword = (e)=>{
//     const email= emailRef.current.value;
//     e.preventDefault();
//     navigate("/Fpassword",{state:{email}});
// console.log(emailRef.current.value)



    return (
        <>
            <title>FoodloversNetwork - Login</title>
        <MyContainer>
        <div className='flex  items-center justify-center container mx-auto py-12'>
      
    
      <form onSubmit={handleLogin} className="fieldset shadow-2xl border-base-300 bg-[#FF7F50] rounded-box w-xs border  p-4">
       
  <h1 className="fieldset-legend pt-5 flex justify-center items-center text-xl text-white font-bold">Login</h1>
  
  <div>
  <label className="label font-bold ">Email</label>
  <input
   type="email"
    name='email'
    ref={emailRef}
    //  value={email}
    // onChange={(e)=>setEmail(e.target.value)}
    className="input bg-teal-50" 
    placeholder="Email" />
</div>
  <div className='relative'>
    <label className="label font-bold ">Password</label>
    <input type={show ? "text" :"password" } name='password'  className="input bg-teal-50 h-7" placeholder="Password" />
    <span onClick={()=>setShow(!show)} className=' absolute right-2  top-[26px] z-50'>{show ? <FaEye /> : <IoEyeOff />}</span>
  </div>

        <button className="btn btn-neutral bg-teal-800 mt-4">Login</button>
  <button onClick={handleGoogleLogin} className="btn btn-neutral py-3 text-center  border-none mt-4"><div className='flex gap-2 items-center justify-center'><FaGoogle />Continue With Google</div></button>
  <p className='text-white font-bold text-center py-3'>Can't have an account?<NavLink to={'/Register'}><button className='border-b'>...Register Now</button></NavLink> </p>
 
</form>

 </div>
 </MyContainer>
        </>
    );
}

export default Login;
