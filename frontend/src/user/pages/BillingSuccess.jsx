import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { getCurrentUserAPI } from '../../services/allAPI';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {

    updateUser();
  }, []);

  const updateUser = async () => {
    const token = sessionStorage.getItem("token");

    console.log("Token found:", !!token); // Debug here

    if (!token) return;

    await new Promise(resolve => setTimeout(resolve, 2000));
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const res = await getCurrentUserAPI(reqHeader);



    if (res.status === 200 && res.data) {
      sessionStorage.setItem("user", JSON.stringify(res.data));
      console.log("res", res.data)
      // navigate("/user/home");
    }
  };

  const handleBack = () => {
    updateUser();
    navigate("/user/home");

  }


  return (

    <div className="flex flex-col  bg-[#0a0a0a] text-gray-100">
      <Header />

      <main className="grow flex items-center min-h-screen justify-center px-6">
        {/* Main Success Card */}
        <div className="max-w-4xl w-full bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl md:grid md:grid-cols-2">

          {/* Left Content Section */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-green-500/20">
                Payment Successful
              </span>
            </div>

            <h1 className="text-4xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Congratulations<span className="text-blue-500">!</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Your purchase was processed successfully. You now have full access to all premium features of <strong>AutoJob AI</strong>.
            </p>

            <button
              onClick={handleBack}
              className="w-full cursor-pointer md:w-max px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Right Visual Section */}
          <div className="bg-[#161616] flex items-center justify-center p-12 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>

            <DotLottieReact
              src="https://lottie.host/d8974f00-8bd2-4c67-b498-503f4552556e/T7Zh23NOOL.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PaymentSuccess