import React from 'react'
import BIN from "../../assets/bin_image.png"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Section1 = () => {

    const { token } = useSelector((state) => state.auth)
    const {t} = useTranslation();
    return (
        <div>

            <div className=' bg-[#DCE2DE]'>

                <div className='flex justify-evenly w-10/12 mx-auto'>

                    <div className='flex flex-col gap-2 justify-center max-w-[700px] font-semibold'>
                        <h1 className=' text-5xl font-roboto'>
                            {t("Transforming")} <span className=' text-[#277158]'>E-waste</span> {t("into Environmental Impact")}
                        </h1>

                        <p className=' text-2xl font-medium max-w-[500px] font-poppins opacity-55'>{t("Join us to perform your responsibility to")} <span className='text-[#277158]'>Mother-Earth</span></p>

                        <div className=' mt-16'>
                            <button className=' bg-[#F19A3E] text-white py-2 px-10 rounded-md text-[28px] font-medium hover:scale-105 transition-all duration-200 font-inter '>
                                <Link to="/signup">{t("Explore More")}</Link>
                            </button>
                        </div>
                    </div>

                    <div>
                        <img src={BIN} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section1
