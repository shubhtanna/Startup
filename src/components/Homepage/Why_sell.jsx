import React, { useState, useEffect } from 'react';
import { TbWorld } from "react-icons/tb";
import { RiRotateLockFill } from "react-icons/ri";
import BULB from '../../assets/bulb_image.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';


function Why_sell() {
  const { t } = useTranslation();
  const [bulbImageURL, setBulbImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/bulb_image.png');
        const url = await getDownloadURL(imageRef);
        setBulbImageURL(url);
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
      }
    };
    fetchImage();
  }, [])

  return (
    <div>
      {/* Green Section */}
      <div className='bg-[#277158]'>
        <div className='w-11/12 md:w-10/12 mx-auto'>
          <h1 className='text-white font-semibold text-3xl sm:text-4xl lg:text-5xl pt-10 sm:pt-16 font-roboto text-center'>
            {t("Why sell E-waste")}?
          </h1>

          {/* Flexbox Container */}
          <div className='text-white flex flex-col lg:flex-row gap-6 lg:gap-10 mt-8 sm:mt-16 pb-16 sm:pb-28'>

            {/* Card 1 */}
            <div className='bg-[#174B3A] px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-5 hover:scale-105 transition-all duration-200 rounded-md'>
              <div>
                <TbWorld size={40} className="mx-auto" />
              </div>
              <h2 className='text-center text-2xl sm:text-[28px] font-medium font-roboto'>
                {t("Environmental Impact")}
              </h2>
              <p className='text-[16px] sm:text-[18px] font-inter text-center'>
                {t("Selling e-waste ensures proper recycling and disposal, reducing environmental pollution and conserving natural resources by reclaiming valuable materials")}.
              </p>
            </div>

            {/* Card 2 */}
            <div className='bg-[#174B3A] px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-5 hover:scale-105 transition-all duration-200 rounded-md'>
              <div>
                <RiRotateLockFill size={40} className="mx-auto" />
              </div>
              <h2 className='text-center text-2xl sm:text-[28px] font-medium font-roboto'>
                {t("Economic Benefits")}
              </h2>
              <p className='text-[16px] sm:text-[18px] font-inter text-center'>
                {t("Users can earn money from their e-waste while supporting a circular economy, encouraging more responsible and profitable disposal habits")}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className='bg-[#DCE2DE] py-12'>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-10 w-11/12 md:w-10/12 mx-auto'>

          {/* Text Content */}
          <div className='lg:w-[52%] flex flex-col justify-center items-center gap-6 lg:gap-10 p-2'>
            <h2 className='text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#174B3A] font-roboto'>
              {t("Turning the Tide on E-Waste: A Sustainable Solution for Digital World")}
            </h2>
            <p className='text-xl sm:text-2xl font-semibold text-[#28735A] max-w-[375px] text-center font-poppins'>
              {t("Turn your own gadgets into green rewards")}
            </p>
            <button className='bg-[#4C9E93] text-[20px] sm:text-[28px] py-2 sm:py-3 px-8 sm:px-12 font-medium rounded-md text-white w-fit hover:scale-105 transition-all duration-200 font-inter'>
              <Link to="/signup">{t("Try Yourself")}</Link>
            </button>
          </div>

          {/* Image */}
          <div className='lg:w-[48%]'>
            <img src={bulbImageURL} className='w-full h-auto' alt='Bulb' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why_sell;
