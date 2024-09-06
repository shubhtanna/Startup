import React from 'react'
import { TbWorld } from "react-icons/tb";
import { RiRotateLockFill } from "react-icons/ri";
import BULB from '../../assets/bulb_image.png'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Why_sell() {
    const {t} = useTranslation();
    return (
        <div>

            <div className='bg-[#277158]'>

                <div className='w-10/12 mx-auto'>

                    <h1 className=' text-white font-semibold text-5xl pt-16 font-roboto'>{t("Why sell E-waste")}?</h1>

                    <div className=' text-white flex gap-10 mt-16 pb-28 group'>

                        <div className='bg-[#174B3A] px-10 py-10 flex flex-col gap-5 group-hover:scale-[0.80] hover:!scale-105 transition-all duration-200 rounded-md'>

                            <div>
                                <TbWorld size={50} />
                            </div>

                            <h2 className=' text-[28px] font-medium font-roboto'>{t("Environmental Impact")}</h2>

                            <p className=' text-[18px] font-inter'>{t("Selling e-waste ensures proper recycling and disposal, reducing environmental pollution and conserving natural resources by reclaiming valuable materials")}.
                            </p>

                        </div>

                        <div className='bg-[#174B3A] px-10 py-10 flex flex-col gap-5 group-hover:scale-[0.80] hover:!scale-105 transition-all duration-200 rounded-md'>

                            <div>
                                <RiRotateLockFill size={50} />
                            </div>

                            <h2 className=' text-[28px] font-medium font-roboto'>{t("Economic Benefits")}</h2>

                            <p className=' text-[18px] font-inter'>{t("Users can earn money from their e-waste while supporting a circular economy, encouraging more responsible and profitable disposal habits")}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#DCE2DE]'>

                <div className='flex justify-center items-center'>

                    <div className=' lg:w-[52%] flex flex-col justify-center w-fit items-center gap-10 p-2'>

                        <h2 className='text-center text-5xl font-bold text-[#174B3A] font-roboto'>{t("Turning the Tide on E-Waste: A Sustainable Solution for Digital World")}</h2>

                        <p className=' text-2xl font-semibold text-[#28735A] max-w-[375px] text-center font-poppins'>{t("Turn your own gadgets into green rewards")}</p>

                        <button className='bg-[#4C9E93] text-[28px] py-3 px-12 font-medium rounded-md text-white w-fit hover:scale-105 transition-all duration-200 font-inter'>
                            <Link to="/signup">{t("Try Yourself")}</Link>
                        </button>
                    </div>

                    <div className=' lg:w-[48%]'>
                        <img src={BULB} className=' w-[100%]'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Why_sell
