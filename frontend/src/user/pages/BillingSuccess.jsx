import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { getCurrentUserAPI } from '../../services/allAPI';

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
    <>
      <Header />
      <div className='container my-10  min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
          <div>
            <h1 className='text-blue-500 md:text-4xl'>Congratulations!!!</h1>
            <p className='text-2xl my-10'> Thank You for Purchasing </p>
            <div className='bg-blue-400 border p-3 text-white cursor-pointer hover:bg-blue-600' onClick={handleBack}>Back</div>

          </div>
          <div className='flex justify-center items-center'> <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="" /></div>

        </div>


      </div>


      <Footer />
    </>
  )
}

export default PaymentSuccess