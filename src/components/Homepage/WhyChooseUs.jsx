import React from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";


const WhyChooseUs = () => {
    return (
        <div>
            <div className='whychoose pt-20 mb-7 p-3'>
                <div className=' text-center text-5xl font-bold mb-16 font-roboto'>Why choose Us?</div>
                <div className='flex justify-evenly group w-10/12 mx-auto'>
                    {/* box-1 */}
                    <div className=' bg-box-rgba text-center mr-3 ml-3 cursor-pointer transition-all duration-500 group-hover:scale-[0.80] hover:!scale-100'>
                        <div className='p-2'>
                            <div className='flex justify-center mt-4 text-4xl'>
                                <FaLeaf className=' text-section-rgba' />
                            </div>
                            <div className='mt-4 text-2xl text-white font-poppins'>
                                <p>Eco-Friendly Solutions</p>
                            </div>
                            <div className='p-4 text-white font-inter'>
                                <p>
                                We prioritize responsible reuse and disposal, helping you contribute to environmental sustainability.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* box-2 */}
                    <div className='bg-box-rgba text-center mr-3 cursor-pointer transition-all duration-500 group-hover:scale-[0.80] hover:!scale-100'>
                        <div className='p-2'>
                            <div className='flex justify-center mt-4 text-4xl'>
                                <IoCheckmarkCircle className=' text-section-rgba' />
                            </div>
                            <div className='mt-4 text-2xl text-white font-poppins'>
                                <p>Best Prices </p>
                            </div>
                            <div className='p-4 text-white font-inter'>
                                <p>
                                Our platform connects you with multiple shopkeepers, ensuring you get the best price estimates for your e-waste.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* box-3 */}
                    <div className=' bg-box-rgba text-center mr-3 cursor-pointer transition-all duration-500 group-hover:scale-[0.80] hover:!scale-100'>
                        <div className='p-2'>
                            <div className='flex justify-center mt-4 text-4xl'>
                                <FaUserTag className=' text-section-rgba' />
                            </div>
                            <div className='mt-4 text-2xl text-white font-poppins'>
                                <p>Rewards and Benefits</p>
                            </div>
                            <div className='p-4 text-white font-inter'>
                                <p>
                                Earn reward points for every successful deal, unlocking incredible offers and incentives for continued use.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center p-8'>
                    <div className='p-4 '>
                        <FaLeaf className=' bg-register-rgba rounded-full text-6xl p-4 transition-all duration-200 hover:text-section-rgba hover:bg-box-rgba' />
                    </div>
                    <div className='p-4'>
                        <IoCheckmarkCircle className=' bg-register-rgba rounded-full text-6xl p-4 transition-all duration-200 hover:text-section-rgba hover:bg-box-rgba' />
                    </div>
                    <div className='p-4'>
                        <FaUserTag className=' bg-register-rgba rounded-full text-6xl p-4 transition-all duration-200 hover:text-section-rgba hover:bg-box-rgba' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WhyChooseUs
