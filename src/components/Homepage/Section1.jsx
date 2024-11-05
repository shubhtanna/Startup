import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig'; // Make sure your firebaseConfig is correctly set up

const Section1 = () => {
  const { token } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [binImageUrl, setBinImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/bin_image.png'); // Replace with the correct path in your Firebase Storage
        const url = await getDownloadURL(imageRef);
        setBinImageUrl(url);
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="bg-[#DCE2DE] py-8">
      <div className="flex flex-col lg:flex-row justify-evenly w-11/12 md:w-10/12 mx-auto gap-8">
        {/* Text Section */}
        <div className="flex flex-col gap-4 justify-center max-w-[750px] font-semibold text-center lg:text-left">
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
          {binImageUrl ? (
            <img src={binImageUrl} alt="E-waste bin" className="max-w-full h-[300px] mb-5" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section1;
