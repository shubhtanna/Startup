// import React from 'react'
// import BIN from "../../assets/bin_image.png"
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

// const Section1 = () => {

//     const { token } = useSelector((state) => state.auth)
//     const {t} = useTranslation();
//     return (
//         <div>
//             <div className=' bg-[#DCE2DE]'>

//                 <div className='flex justify-evenly w-10/12 mx-auto'>

//                     <div className='flex flex-col gap-2 justify-center max-w-[700px] font-semibold'>
//                         <h1 className=' text-5xl font-roboto'>
//                             {t("Transforming")} <span className=' text-[#277158]'>E-waste</span> {t("into Environmental Impact")}
//                         </h1>

//                         <p className=' text-2xl font-medium max-w-[500px] font-poppins opacity-55'>{t("Join us to perform your responsibility to")} <span className='text-[#277158]'>Mother-Earth</span></p>

//                         <div className=' mt-16'>
//                             <button className=' bg-[#F19A3E] text-white py-2 px-10 rounded-md text-[28px] font-medium hover:scale-105 transition-all duration-200 font-inter '>
//                                 <Link to="/signup">{t("Explore More")}</Link>
//                             </button>
//                         </div>
//                     </div>

//                     <div>
//                         <img src={BIN} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Section1


import React from 'react';
import BIN from '../../assets/bin_image.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Section1 = () => {
  const { token } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="bg-[#DCE2DE] py-8">
      <div className="flex flex-col lg:flex-row justify-evenly w-11/12 md:w-10/12 mx-auto gap-8">
        {/* Text Section */}
        <div className="flex flex-col gap-4 justify-center max-w-[700px] font-semibold text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-roboto">
            {t('Transforming')} <span className="text-[#277158]">E-waste</span> {t('into Environmental Impact')}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-medium max-w-[500px] font-poppins opacity-70 mx-auto lg:mx-0">
            {t('Join us to perform your responsibility to')} <span className="text-[#277158]">Mother-Earth</span>
          </p>

          {/* Button */}
          <div className="mt-8 lg:mt-16">
            <Link to="/signup">
              <button className="bg-[#F19A3E] text-white py-2 px-6 lg:px-10 rounded-md text-lg lg:text-2xl font-medium hover:scale-105 transition-all duration-200 font-inter">
                {t('Explore More')}
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-end">
          <img src={BIN} alt="E-waste bin" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Section1;
