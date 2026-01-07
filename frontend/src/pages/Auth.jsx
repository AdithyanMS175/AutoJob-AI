import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

// Placeholder Logo
const Logo = () => (
  <div className="flex items-center gap-2">
    <Briefcase className="w-8 h-8 text-blue-500" />
    <span className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
      AutoJob AI
    </span>
  </div>

);

const Auth = ({ registerURL }) => {

  const navigate = useNavigate();


  const toggleMode = () => setregisterURL(!registerURL);

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
  };

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

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1.5 pl-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-600 text-sm"
                    placeholder="youremail@yourdomain.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-zinc-300 mb-1.5 pl-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-600 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-zinc-900/20"
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
                  <FcGoogle size={20} />
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
                  onClick={toggleMode}
                  className="text-orange-500 hover:text-orange-400 font-semibold ml-1 transition-colors cursor-pointer"
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
    </div>
  );
};

export default Auth;