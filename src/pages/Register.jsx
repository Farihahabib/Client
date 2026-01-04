import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaGoogle } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import MyContainer from "../Components/MyContainer";
import useAuth from "../Hooks/useAuth";
import { saveorUpdateUser } from "../Utills";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { createuserWithEmailAndPasswordFunc, updateprofileFunc, signinwithgooglefunc, setUser, setLoading, loading } = useAuth();

  const [show, setShow] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { displayName, email, password, photoURL } = data;
    const finalPhotoURL = photoURL || "https://via.placeholder.com/88";

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
      toast.success("Registration Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  // Google register
  const handleGoogleregister = async () => {
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
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>FoodloversNetwork - Registration</title>
      <MyContainer>
        <div className="flex items-center justify-center container mx-auto py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset shadow-2xl border-base-300 bg-[#FF7F50] rounded-box w-xs border p-4">
            <h1 className="fieldset-legend pt-5 flex justify-center items-center text-xl text-white font-bold">Register Now</h1>

            {/* Name */}
            <label className="label font-bold">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="input bg-teal-50 h-7"
              {...register("displayName", { required: "Name is required" })}
            />
            {errors.displayName && <p className="text-red-500 text-xs">{errors.displayName.message}</p>}

            {/* Photo URL */}
            <label className="label font-bold">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL (optional)"
              className="input bg-teal-50 h-7"
              {...register("photoURL")}
            />

            {/* Email */}
            <label className="label font-bold">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input bg-teal-50 h-7"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

            {/* Password */}
            <div className="relative">
              <label className="label font-bold py-2">Password</label>
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="input bg-teal-50 h-7"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
                    message: "Password must contain uppercase, lowercase, and a number",
                  },
                })}
              />
              <span onClick={() => setShow(!show)} className="absolute right-2 top-[41px] z-50">
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <button type="submit" className="btn btn-neutral bg-teal-800 mt-4 w-full">
              {loading ? "Loading..." : "Submit"}
            </button>

            <button type="button" onClick={handleGoogleregister} className="btn border-none mt-4 text-white w-full flex items-center justify-center gap-2">
              <FaGoogle /> Continue With Google
            </button>

            <p className="text-white font-bold text-center py-3">
              Already have an account? <NavLink to={"/login"}><button className="border-b">Login</button></NavLink>
            </p>
          </form>
        </div>
      </MyContainer>
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