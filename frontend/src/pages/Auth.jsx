import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// Placeholder Logo
const Logo = () => (
  <div className="flex items-center gap-2">
    <Briefcase className="w-8 h-8 text-blue-500" />
    <span className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
      AutoJob AI
    </span>
  </div>

);

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="relative flex p-1 bg-zinc-800/50 rounded-xl border border-zinc-700/50 mb-6">
      {/* Sliding Background */}
      <motion.div
        className="absolute inset-y-1 bg-orange-500 rounded-lg shadow-lg shadow-orange-500/20"
        initial={false}
        animate={{
          x: role === 'candidate' ? 0 : '100%',
          width: '49%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        type="button"
        onClick={() => setRole('candidate')}
        className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 ${role === 'candidate' ? 'text-white' : 'text-zinc-400'
          }`}
      >
        Job Seeker
      </button>

      <button
        type="button"
        onClick={() => setRole('recruiter')}
        className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors duration-200 ${role === 'recruiter' ? 'text-white' : 'text-zinc-400'
          }`}
      >
        Recruiter
      </button>
    </div>
  );
};

const Auth = ({ registerURL }) => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    role: "recruiter"
  })

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)


  const toggle = () => {
    console.log('toogleclicked');
    if (!registerURL) {
      navigate('/signup')
    } else {
      navigate('/login')
    }

  }

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
  };


  const validateInput = (InputTag) => {

    const { name, value } = InputTag;

    if (name === "email") {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setUserDetails({ ...userDetails, email: value });
        setInvalidEmail(false);
      } else {
        setInvalidEmail(true);
      }
    }

    else if (name === "password") {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        setUserDetails({ ...userDetails, password: value });
        setInvalidPassword(false);
      } else {
        setInvalidPassword(true);
      }
    }
  };


  const handleregister = async (e) => {
    console.log("clicked");

    e.preventDefault();
    const { email, password, role } = userDetails;
    console.log(email, password, role);


    if (email && password && role) {
      try {

        const result = await registerAPI(userDetails);
        console.log(result)

        if (result.status == 200) {
          toast.success("Registered Successfully")
          setUserDetails({ email: "", password: "" })
          navigate('/login')

        } else if (result.status == 409) {
          toast.warning(result.response.data);
          setUserDetails({ email: "", password: "" })
          navigate('/login')
        }
        else {
          toast.error("Something went error !!!")
          setUserDetails({ email: "", password: "" })

        }


      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong Try again Later")

      }

    }



  }

  const handleLogin = async (e) => {

    e.preventDefault()
    const { email, password } = userDetails;

    if (email && password) {

      const result = await loginAPI(userDetails);
      if (result.status == 200) {
        toast.success("Login Successfull");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(result.data.user))
        setUserDetails({ email: "", password: "" })
        // setAuthorisedUser(true);
        setTimeout(() => {
          if (result.data.user.role == "admin") {
            navigate('/admin/home')
          } else if (result.data.user.role == "candidate") {
            navigate('/user/home');
          } else if (result.data.user.role == "recruiter") {
            navigate('/recruiter/home');
          }
        }, 2500)
      } else if (result.status == 401 || result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({ email: "", password: "" })
      } else {
        toast.error("Something Went Wrong");
        console.log(result);
      }
    } else {
      toast.warning("Please fill the form completely")
    }




  }


  const handleGoogleLogin = async (credentialResponse) => {
    const { email, password, role } = userDetails;
    console.log(role);
    console.log(userDetails.role);
    console.log("Inside handleGoogleLogin");
    console.log('credentialResponse', credentialResponse);
    const decode = jwtDecode(credentialResponse.credential)
    console.log('decode', decode);
    const result = await googleLoginAPI({ username: decode.name, email: decode.email, password: "googlePassword", picture: decode.picture, role: userDetails.role })
    console.log('result.data.user', result.data.user)
    if (result.status == 200) {
      toast.success("Login Successfull")
      sessionStorage.setItem("token", result.data.token)
      sessionStorage.setItem("user", JSON.stringify(result.data.user))

      setTimeout(() => {
        if (result.data.user.role == "admin") {
          navigate('/admin/home')
        } else if (result.data.user.role == "candidate") {
          navigate('/user/home');
        } else if (result.data.user.role == "recruiter") {
          navigate('/recruiter/home');
        }
      }, 2500)

    } else {
      toast.warning("Please fill the form completely")
      console.log(result);

    }



  }

  









  return (

    <div className="h-screen w-full bg-black text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl h-full md:h-[85vh] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-zinc-900/30 p-6 md:p-10 rounded-[2.5rem] border border-zinc-800/50 backdrop-blur-sm shadow-2xl">
        <div className="flex flex-col justify-center h-full overflow-y-auto md:overflow-visible custom-scrollbar">
          <Logo />
          <AnimatePresence mode="wait">
            <motion.div
              key={registerURL ? 'signup' : 'login'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <h1 className="text-3xl font-bold mb-2">
                {registerURL ? 'Create an account' : 'Welcome back!'}
              </h1>



              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                {registerURL
                  ?
                  'Join us to start creating, simulating, and managing AI-driven workflows visually.' :
                  'We empower developers and technical teams to create, simulate, and manage AI-driven workflows visually.'
                }
              </p>


              <RoleToggle
                role={userDetails.role}
                setRole={(val) => setUserDetails({ ...userDetails, role: val })}
              />


              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1.5 pl-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name='email'
                    id="email"
                    className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-600 text-sm"
                    placeholder="youremail@yourdomain.com"

                    onChange={(e) => validateInput(e.target)}
                  />
                  {invalidEmail && <span className='text-red-500 text-xs font-medum ml-1'>Email is not Valid</span>}

                </div>
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-zinc-300 mb-1.5 pl-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name='password'
                    id="password"
                    className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-600 text-sm"
                    placeholder="Create a password"

                    onChange={(e) => validateInput(e.target)}

                  />
                  {invalidPassword &&
                    <div className='flex flex-col'>
                      <span className='text-red-500 text-xs font-medum ml-2'>
                        Length: 8 characters
                      </span>

                      <span className='text-red-500 text-xs font-medum ml-2'>
                        Must contain at least one letter (A-Z or a-z)
                      </span>

                      <span className='text-red-500 text-xs font-medum ml-2'>
                        Must contain at least one digit (0-9)
                      </span>

                      <span className='text-red-500 text-xs font-medum ml-2'>
                        Can ONLY contain letters and numbers
                      </span>
                    </div>
                  }

                </div>
                <button
                  type="button"
                  className="cursor-pointer w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-zinc-900/20"
                  onClick={registerURL ? handleregister : handleLogin}

                >
                  {registerURL ? 'Sign Up' : 'Login'}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="grow border-t border-zinc-800"></div>
                <span className="px-4 text-zinc-500 text-xs">or</span>
                <div className="grow border-t border-zinc-800"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button className="cursor-pointer flex justify-center items-center py-2.5 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-700/50">
                  {/* <FcGoogle size={20} /> */}
                  <GoogleLogin className="hidden"
                    onSuccess={credentialResponse => {
                      console.log('credentialResponse', credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />;
                </button>
                <button className="cursor-pointer flex justify-center items-center py-2.5 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-700/50 text-[#1877F2]">
                  <FaFacebook size={20} />
                </button>
                <button className="cursor-pointer flex justify-center items-center py-2.5 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-700/50">
                  <FaApple size={20} />
                </button>
              </div>

              <p className="text-center text-zinc-400 mt-6 text-xs">
                {registerURL ? "Already have an account?" : "Don't have an account?"}{' '}
                <button
                  onClick={toggle}
                  className="text-orange-500 hover:text-orange-400 font-semibold ml-1 transition-colors cursor-pointer bg-white"
                >
                  {registerURL ? 'login' : 'Sign Up'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Right Side: Testimonial Section --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          // UPDATED: h-full ensures it fills the container exactly. Removed min-h-[600px]
          className="hidden md:flex relative rounded-4xl overflow-hidden h-full flex-col justify-end"
          style={{
            background: 'radial-gradient(circle at 100% 0%, rgba(63,63,70,0.4) 0%, rgba(24,24,27,1) 100%), linear-gradient(135deg, #27272a 0%, #09090b 100%)',
          }}
        >
          {/* Ambient light effects */}
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-zinc-700/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 p-8 lg:p-10 w-full">
            <div className="flex space-x-3 mb-6">
              <span className="px-3 py-1 bg-zinc-800/40 rounded-full text-[10px] uppercase tracking-wider font-medium text-zinc-300 backdrop-blur-md border border-zinc-700/30">
                Product Company
              </span>
              <span className="px-3 py-1 bg-zinc-800/40 rounded-full text-[10px] uppercase tracking-wider font-medium text-zinc-300 backdrop-blur-md border border-zinc-700/30">
                Cloud Management
              </span>
            </div>

            <div className="bg-zinc-800/60 p-6 lg:p-8 rounded-3xl backdrop-blur-xl border border-zinc-700/30 shadow-2xl">
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-zinc-100">
                "Aceternity Pro Components have completely changed how we work. What used to take
                hours every week is now fully automated."
              </p>
              <div>
                <h4 className="text-base font-bold text-white">Gina Clinton</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Head of Product, <span className="text-zinc-300 font-medium">Acme Inc.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} theme='colored' />

    </div>
  );
};

export default Auth;