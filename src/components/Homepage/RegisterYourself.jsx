import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserTag } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterYourself = () => {
    const { t } = useTranslation();

    return (
        <div className='bg-[#EEF2E3] py-8'>
            <div className='w-11/12 lg:w-4/5 mx-auto pb-8'>
                <h2 className='font-roboto font-semibold text-3xl sm:text-4xl lg:text-5xl py-8 sm:py-16 text-center'>
                    {t("Register yourself")}!
                </h2>

                {/* Flex container for responsive design */}
                <div className='flex flex-col lg:flex-row lg:gap-x-5 gap-8 justify-center'>

                    {/* Seller Card */}
                    <div className='bg-[#174B3A] text-white px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col gap-4 rounded-md w-full lg:w-[50%]'>
                        <FaUserTag size={60} className='text-white mx-auto' />
                        <p className='font-poppins font-medium text-2xl sm:text-3xl text-center'>
                            {t("Seller")} <span className='font-inter text-base sm:text-lg'>({t("as a user")})</span>
                        </p>
                        <p className='font-inter text-base sm:text-lg lg:text-xl text-center'>
                            {t("Join us in re-using e-waste for a greener planet. Sell your electronics hassle-free with competitive pricing. Sign up now to start selling your e-waste today")}!
                        </p>
                        <div className='flex justify-center mt-6 lg:mt-10'>
                            <Link to="/signup" className='bg-[#FEFDED] rounded-md px-10 sm:px-16 py-2 font-inter font-semibold text-lg sm:text-2xl lg:text-3xl text-black hover:scale-105 transition-all duration-300'>
                                {t("Register")}
                            </Link>
                        </div>
                    </div>

                    {/* Buyer Card */}
                    <div className='bg-[#174B3A] text-white px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 flex flex-col gap-4 rounded-md w-full lg:w-[50%]'>
                        <FaUserTag size={60} className='text-white mx-auto' />
                        <p className='font-poppins font-medium text-2xl sm:text-3xl text-center'>
                            {t("Buyer")} <span className='font-inter text-base sm:text-lg'>({t("as a shopkeeper")})</span>
                        </p>
                        <p className='font-inter text-base sm:text-lg lg:text-xl text-center'>
                            {t("Become a part of our network and access quality e-waste for your business. Enjoy competitive pricing and increased visibility. Sign up now to start sourcing e-waste from our platform")}!
                        </p>
                        <div className='flex justify-center mt-6 lg:mt-10'>
                            <Link to="/signup" className='bg-[#FEFDED] rounded-md px-10 sm:px-16 py-2 font-inter font-semibold text-lg sm:text-2xl lg:text-3xl text-black hover:scale-105 transition-all duration-300'>
                                {t("Register")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterYourself;
