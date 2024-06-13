import React from 'react'
import { FaUserTag } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterYourself = () => {
    return (
        <div className=' bg-[#EEF2E3]'>

            <div className=' w-4/5 mx-auto pb-16'>

                <h2 className=' font-roboto font-semibold text-5xl py-16'>Register yourself!</h2>

                <div className='flex gap-x-5'>

                    <div className='bg-[#174B3A] text-white px-16 py-20 flex flex-col gap-4'>

                        <FaUserTag size={70} className='text-white'/>

                        <p className=' font-poppins font-medium text-[28px]'>Seller <span className=' font-inter font-medium text-base'>(as a user)</span></p>

                        <p className=' font-inter font-normal text-xl'>Join us in re-using e-waste for a greener planet. Sell your electronics hassle-free with competitive pricing. Sign up now to start selling your e-waste today!</p>

                        <div className='flex justify-center mt-10'>
                            <Link to="/signup" className=' bg-[#FEFDED] rounded-2xl px-16 py-2 font-inter font-semibold text-3xl text-black hover:scale-110 transition-all duration-300'>Register</Link>
                        </div>

                    </div>

                    <div className='bg-[#174B3A] text-white px-16 py-20 flex flex-col gap-4'>

                        <FaUserTag size={70} className='text-white'/>

                        <p className=' font-poppins font-medium text-[28px]'>Buyer <span className=' font-inter font-medium text-base'>(as a shopkeeper)</span></p>

                        <p className=' font-inter font-normal text-xl'>Become a part of our network and access quality e-waste for your business. Enjoy competitive pricing and increased visibility. Sign up now to start sourcing e-waste from our platform!</p>

                        <div className='flex justify-center mt-10'>
                            <Link to="/signup" className=' bg-[#FEFDED] rounded-2xl px-16 py-2 font-inter font-semibold text-3xl text-black hover:scale-110 transition-all duration-300'>Register</Link>
                        </div>

                    </div>

                    
                </div>

            </div>

        </div>
    )
}

export default RegisterYourself
