import { useContext, useRef, useState } from 'react';
import { FaEye, FaGoogle, FaEnvelope, FaLock, FaUtensils } from 'react-icons/fa';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import MyContainer from '../Components/MyContainer';
import useAuth from '../Hooks/useAuth';
import { DotLoader } from 'react-spinners';
import { saveorUpdateUser } from '../Utills';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { user, setUser, signInWithEmailAndPasswordFunc, signinwithgooglefunc, loading, setLoading } = useAuth();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { user } = await signInWithEmailAndPasswordFunc(email, password);
      await saveorUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      setUser(user);
      setLoading(false);
      navigate(from, { replace: true });
      toast.success("Welcome back! Login successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { user } = await signinwithgooglefunc();
      await saveorUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      setUser(user);
      setLoading(false);
      navigate(from, { replace: true });
      toast.success("Welcome! Login successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <DotLoader color="#FF4500" size={60} />
    </div>
  );
  
  if (user) return <Navigate to={from} replace />;

  return (
    <>
      <title>FoodloversNetwork - Login</title>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 dark:bg-orange-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 shadow-lg">
              <FaUtensils className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your Food Lovers account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaEnvelope className="text-orange-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             transition-all duration-200 ease-in-out"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaLock className="text-orange-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             transition-all duration-200 ease-in-out pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 
                         text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl 
                         transform hover:scale-[1.02] transition-all duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <DotLoader color="white" size={20} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
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

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <NavLink 
                  to="/Register" 
                  className="font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                >
                  Create one now
                </NavLink>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <NavLink to="/Terms_Conditions" className="text-orange-500 hover:text-orange-600 transition-colors">
                Terms of Service
              </NavLink>
              {' '}and{' '}
              <NavLink to="/PrivacyPolicy" className="text-orange-500 hover:text-orange-600 transition-colors">
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

export default Login;
