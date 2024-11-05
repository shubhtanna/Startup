import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";


const WhyChooseUs = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className='whychoose pt-20 mb-7 p-3'>
                <div className='text-center text-3xl md:text-5xl font-bold mb-12 font-roboto'>{t("Why choose Us")}?</div>
                
                {/* Flexbox container for the cards */}
                <div className='flex flex-col lg:flex-row justify-evenly gap-8 w-11/12 mx-auto'>
                    {/* Box 1 */}
                    <div className='bg-box-rgba text-center cursor-pointer transition-all duration-500 group-hover:scale-[0.80] hover:!scale-100 rounded-md p-6'>
                        <div className='flex justify-center mt-4 text-4xl'>
                            <FaLeaf className='text-section-rgba' />
                        </div>
                        <div className='mt-4 text-xl md:text-2xl text-white font-poppins'>
                            <p>{t("Eco-Friendly Solutions")}</p>
                        </div>
                        <div className='mt-2 p-2 text-white text-sm md:text-base font-inter'>
                            <p>{t("We prioritize responsible reuse and disposal, helping you contribute to environmental sustainability")}.</p>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className='bg-box-rgba text-center cursor-pointer transition-all duration-500 group-hover:scale-[0.80] hover:!scale-100 rounded-md p-6'>
                        <div className='flex justify-center mt-4 text-4xl'>
                            <IoCheckmarkCircle className='text-section-rgba' />
                        </div>
                        <div className='mt-4 text-xl md:text-2xl text-white font-poppins'>
                            <p>{t("Best Prices")}</p>
                        </div>
                        <div className='mt-2 p-2 text-white text-sm md:text-base font-inter'>
                            <p>{t("Our platform connects you with multiple shopkeepers, ensuring you get the best price estimates for your e-waste")}.</p>
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className='bg-box-rgba text-center cursor-pointer transition-all duration-500 group-hover:scale-[0.80] hover:!scale-100 rounded-md p-6'>
                        <div className='flex justify-center mt-4 text-4xl'>
                            <FaUserTag className='text-section-rgba' />
                        </div>
                        <div className='mt-4 text-xl md:text-2xl text-white font-poppins'>
                            <p>{t("Rewards and Benefits")}</p>
                        </div>
                        <div className='mt-2 p-2 text-white text-sm md:text-base font-inter'>
                            <p>{t("Earn reward points for every successful deal, unlocking incredible offers and incentives for continued use")}.</p>
                        </div>
                    </div>
                </div>

                {/* Responsive icons at the bottom */}
                <div className='flex justify-center mt-12 space-x-4'>
                    <div className='p-4'>
                        <FaLeaf className='bg-register-rgba rounded-full text-5xl md:text-6xl p-4 transition-all duration-200 hover:text-section-rgba hover:bg-box-rgba' />
                    </div>
                    <div className='p-4'>
                        <IoCheckmarkCircle className='bg-register-rgba rounded-full text-5xl md:text-6xl p-4 transition-all duration-200 hover:text-section-rgba hover:bg-box-rgba' />
                    </div>
                    <div className='p-4'>
                        <FaUserTag className='bg-register-rgba rounded-full text-5xl md:text-6xl p-4 transition-all duration-200 hover:text-section-rgba hover:bg-box-rgba' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
