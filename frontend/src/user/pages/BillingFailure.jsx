import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../../components/Footer'

function PaymentFailure() {
    return (
        <>
            <Header />
            <div className='container my-10  min-h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
                    <div>
                        <h1 className='text-red-500 md:text-4xl'>Payment Failed!!!</h1>
                        <p className='text-2xl my-10'> Sorry For The Inconvenience </p>
                        <Link className='bg-red-400 border p-3 text-white cursor-pointer hover:bg-red-700' to={'/'}>Explore More Books</Link>
                    </div>
                    <div className='flex justify-center items-center'> <img src="https://easyfashion.com.bd/wp-content/uploads/2021/04/payment-failed-min.gif" alt="" srcset="" /></div>

                </div>


            </div>


            <Footer />
        </>
    )
}

export default PaymentFailure