import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';
import { motion } from 'framer-motion'; // Add framer-motion for animations

const Section1 = () => {
  const { token } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [binImageUrl, setBinImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/bin_image.png');
        const url = await getDownloadURL(imageRef);
        setBinImageUrl(url);
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gradient-to-b from-[#e9efea] to-[#DCE2DE] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Section */}
          <motion.div 
            className="flex-1 flex flex-col gap-6 max-w-2xl"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="inline-block px-3 py-1 bg-[#277158]/10 text-[#277158] rounded-full text-sm font-medium mb-2">
              {t('Sustainable E-Waste Solutions')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t('Transforming')} <span className="text-[#277158] relative">
                E-waste
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#277158]/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> {t('into Environmental Impact')}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-[500px]">
              {t('Join us to perform your responsibility to')} <span className="text-[#277158] font-medium">Mother-Earth</span> {t('and create a sustainable future for generations to come.')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 mb-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[#277158] font-bold text-2xl">2M+</p>
                <p className="text-sm text-gray-600">{t('Devices Recycled')}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <p className="text-[#277158] font-bold text-2xl">500+</p>
                <p className="text-sm text-gray-600">{t('Collection Centers')}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm sm:col-span-1 col-span-2">
                <p className="text-[#277158] font-bold text-2xl">45K+</p>
                <p className="text-sm text-gray-600">{t('Active Users')}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/signup">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#277158] text-white py-3 px-8 rounded-lg text-lg font-medium shadow-lg shadow-[#277158]/20 transition-all duration-200"
                >
                  {t('Get Started')}
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border-2 border-[#277158] text-[#277158] py-3 px-8 rounded-lg text-lg font-medium transition-all duration-200"
                >
                  {t('Learn More')}
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-[#F19A3E]/10 rounded-full blur-3xl transform -rotate-6"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
              {isLoading ? (
                <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-xl animate-pulse">
                  <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <img 
                  src={binImageUrl} 
                  alt="E-waste recycling" 
                  className="w-full h-auto rounded-lg shadow-md object-cover object-center max-h-[400px]" 
                />
              )}
              <div className="absolute -bottom-4 -right-4 bg-[#F19A3E] text-white p-3 rounded-lg shadow-lg">
                <p className="font-bold">{t('Recycle Today')}</p>
                <p className="text-sm">{t('Make a difference')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Section1;