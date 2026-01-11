import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaGoogle, FaEnvelope, FaLock, FaUser, FaImage, FaUtensils } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import { saveorUpdateUser } from "../Utills";
import { DotLoader } from "react-spinners";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { createuserWithEmailAndPasswordFunc, updateprofileFunc, signinwithgooglefunc, setUser, setLoading, loading } = useAuth();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { displayName, email, password, photoURL } = data;
    const finalPhotoURL = photoURL || "https://via.placeholder.com/88";

    setIsLoading(true);
    setLoading(true);

    try {
      // Firebase Auth
      const res = await createuserWithEmailAndPasswordFunc(email, password);

      // Update Firebase Profile
      await updateprofileFunc(displayName, finalPhotoURL);

      // Save to MongoDB
      await saveorUpdateUser({
        name: displayName,
        email: email,
        image: finalPhotoURL,
      });

      // Update state & navigate
      setUser(res.user);
      setLoading(false);
      toast.success("Welcome to Food Lovers Network! Registration successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Google register
  const handleGoogleregister = async () => {
    setIsLoading(true);
    setLoading(true);
    try {
      const { user } = await signinwithgooglefunc();

      await saveorUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      setUser(user);
      setLoading(false);
      toast.success("Welcome! Registration successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <DotLoader color="#FF4500" size={60} />
    </div>
  );

  return (
    <>
      <title>FoodloversNetwork - Registration</title>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 shadow-lg">
              <FaUtensils className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Join Food Lovers!</h1>
            <p className="text-gray-600 dark:text-gray-400">Create your account and start sharing food experiences</p>
          </div>

          {/* Register Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             transition-all duration-200 ease-in-out"
                    {...register("displayName", { required: "Name is required" })}
                  />
                </div>
                {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName.message}</p>}
              </div>

              {/* Photo URL Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaImage className="text-purple-500" />
                  Profile Photo URL (Optional)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             transition-all duration-200 ease-in-out"
                    {...register("photoURL")}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaEnvelope className="text-green-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             transition-all duration-200 ease-in-out"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaLock className="text-red-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             transition-all duration-200 ease-in-out pr-12"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
                        message: "Password must contain uppercase, lowercase, and a number",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                         text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl 
                         transform hover:scale-[1.02] transition-all duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <DotLoader color="white" size={20} />
                    <span>Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or register with</span>
                </div>
              </div>

              {/* Google Register Button */}
              <button
                type="button"
                onClick={handleGoogleregister}
                disabled={isLoading}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg 
                         transform hover:scale-[1.02] transition-all duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center gap-3"
              >
                <FaGoogle className="text-red-500" />
                {isLoading ? "Please wait..." : "Continue with Google"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <NavLink 
                  to="/login" 
                  className="font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Sign in here
                </NavLink>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our{' '}
              <NavLink to="/Terms_Conditions" className="text-blue-500 hover:text-blue-600 transition-colors">
                Terms of Service
              </NavLink>
              {' '}and{' '}
              <NavLink to="/PrivacyPolicy" className="text-blue-500 hover:text-blue-600 transition-colors">
                Privacy Policy
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default Register;
























// import React, {  useContext, useState } from 'react';

// import { FaEye, FaGoogle } from 'react-icons/fa';
// import { NavLink, useNavigate } from 'react-router';


// import { toast } from 'react-toastify';
// import { IoEyeOff } from 'react-icons/io5';
// import { AuthContext } from '../Context/AuthContext';
// import MyContainer from '../Components/MyContainer';
// import { saveorUpdateUser } from '../Utills';
// import useAuth from '../Hooks/useAuth';




// const Register = () => {
//      const navigate = useNavigate();
//     const{createuserWithEmailAndPasswordFunc, updateprofileFunc,user,setUser,signinwithgooglefunc,setLoading} = useAuth()
//     const [show,setshow] = useState(false);
//    console.log("register user", user)
//     const handleregister = (e)=>{
// e.preventDefault();
// const displayName = e.target.displayName?.value;
// const email = e.target.email?.value;
// const password = e.target.password?.value;
// const photoURL = e.target.photoURL?.value || "https://via.placeholder.com/88";
// console.log("registered",{displayName,email})
    
// const re = /^(?=.{6,64}$)(?=.*[a-z])(?=.*[A-Z]).*$/;
// if (!re.test(password)){
//     toast.error("Password must contain at least one uppercase letter, one lowercase letter and atleast 6 character.");
//     return
// }

// createuserWithEmailAndPasswordFunc(email,password).then((res)=>{
//     console.log(res)
//     setUser(res.user);
// updateprofileFunc( displayName, photoURL)
//       .then(async () => {
//         // MongoDB save
//         await saveorUpdateUser({
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//         })
//     setLoading(false);
//           toast.success("Registration Successful")
//            navigate("/")});
// })
         
// .catch((e)=>{
// if(e.code === "auth/email-already-in-use")
//     {
//         toast.error("Email already in use. Please use a different email.");
//     }
//     else if(e.code === "auth/invalid-email")
//     {
//         toast.error("Invalid email format. Please enter a valid email.");
//     }
//     else if(e.code === "auth/weak-password")
//     {
//         toast.error("Use atleast 6 character for password.");
//     }
//     else{
//         toast.error(e.message);
//     }
//     setLoading(false)
// })
//     }
//      const handleGoogleregister = async () => {
//     try {
//       //User Registration using google
//  const {user} = await signinwithgooglefunc()
// await saveorUpdateUser({name:user?.displayName,
//   email:user?.email,
//   image:user?.photoURL,
// })
//       navigate(from, { replace: true })
//       toast.success('Signup Successful')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.message)
//     }
//   }
// //     const handlegoogleregister = (e)=>{
// // signinwithgooglefunc().then((res)=>{
// // console.log(res);
// // console.log(e)
// // setLoading(false);
// // setUser(res.user);
// // navigate("/");

// // })
// // .catch((e)=>{
// //     toast.error(e.message);
// // })
// //     }
    
//     return (
//         <>
//             <title>FoodloversNetwork - Registration</title>
//                 <MyContainer>
//         <div className='flex  items-center justify-center container mx-auto py-12'>
      
    
//       <form onSubmit={handleregister} className="fieldset shadow-2xl border-base-300 bg-[#FF7F50] rounded-box w-xs border  p-4">
       
//   <h1 className="fieldset-legend pt-5 flex justify-center items-center text-xl text-white font-bold">Register Now</h1>

//   <label className="label font-bold ">Name</label>
//   <input type="text" name='displayName' className="input bg-teal-50 h-7" placeholder="Your Name" />
//   <label className="label font-bold ">Photo</label>
//   <input type="text"  name='photoURL'  className="input bg-teal-50 h-7" placeholder="choose a photo" />

//   <label className="label font-bold ">Email</label>
//   <input type="email"  name='email'  className="input bg-teal-50 h-7 text-gray-400" placeholder="Email" />
//   <div className='relative'>
//   <label className="label font-bold py-2 ">Password</label>
//   <input type={show ? "text" :"password" } name='password'  className="input bg-teal-50 h-7" placeholder="Password" />
 
//   <span onClick={()=>setshow(!show)} className=' absolute right-2  top-[41px] z-50'>{show ? <FaEye /> : <IoEyeOff />}</span>
 
// </div>
//   <button className="btn btn-neutral bg-teal-800 mt-4">Submit</button>

//   <button onClick={handleGoogleregister} className="btn  border-none mt-4 text-white"><div className='flex gap-2 items-center justify-center'><FaGoogle />Continue With Google</div></button>
//   <p className='text-white font-bold text-center py-3'>Already have an account? <NavLink to={'/login'}> <button className='border-b'>Login</button></NavLink> </p>
 
// </form>

//  </div>
//  </MyContainer>
        
//         </>
//     )
// }

// export default Register;