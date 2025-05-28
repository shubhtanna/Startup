import React, { useState, useEffect } from 'react';
import { TbWorld, TbRecycle, TbLeaf } from "react-icons/tb";
import { RiRotateLockFill, RiShieldCheckLine } from "react-icons/ri";
import { FaArrowRight, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineMonetizationOn } from "react-icons/md";
import BULB from '../../assets/bulb_image.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

function Why_sell() {
  const { t } = useTranslation();
  const [bulbImageURL, setBulbImageURL] = useState('');
  const [isVisible, setIsVisible] = useState(false);

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
    
    // Animation on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('why-sell-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  // Impact metrics
  const impactMetrics = [
    { value: '5,000+', label: t('Tons of E-Waste Recycled') },
    { value: '30%', label: t('Reduction in Landfill Waste') },
    { value: '12,000+', label: t('Happy Users') }
  ];

  return (
    <div>
      {/* Enhanced Green Section */}
      <div id="why-sell-section" className='bg-gradient-to-b from-[#1d5d47] to-[#277158] relative overflow-hidden py-20'>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#174B3A]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#174B3A]/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#4C9E93]/10 rounded-full blur-2xl"></div>
        
        <div className={`w-11/12 md:w-10/12 mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className='text-white font-semibold text-3xl sm:text-4xl lg:text-5xl pt-10 sm:pt-16 font-roboto text-center'>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#a8e9d5]">
              {t("Why sell E-waste")}?
            </span>
          </h1>
          <div className="w-24 h-1 bg-emerald-300 mx-auto rounded-full mt-4"></div>
          <p className="text-emerald-100 text-center max-w-2xl mx-auto mt-4 mb-10 text-lg">
            {t("Discover the compelling reasons to responsibly manage your electronic waste")}
          </p>

          {/* Impact metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-emerald-200 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Improved Card Container */}
          <div className='text-white grid md:grid-cols-2 gap-8 lg:gap-10 mt-8 pb-10 max-w-5xl mx-auto'>
            {/* Card 1 - Environmental Impact */}
            <div className='relative group overflow-hidden rounded-xl shadow-xl'>
              <div className="absolute inset-0 bg-gradient-to-br from-[#174B3A]/90 to-[#276e5a]/60 opacity-90 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative p-8 h-full flex flex-col items-center">
                <div className="mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <div className="bg-white/10 p-4 rounded-lg inline-block backdrop-blur-sm">
                    <TbWorld size={40} className="text-emerald-300" />
                  </div>
                </div>
                <h2 className='text-center text-2xl sm:text-[28px] font-bold mb-4 font-roboto'>
                  {t("Environmental Impact")}
                </h2>
                <p className='text-[16px] sm:text-[18px] font-inter text-center text-emerald-100 mb-6'>
                  {t("Selling e-waste ensures proper recycling and disposal, reducing environmental pollution and conserving natural resources by reclaiming valuable materials")}.
                </p>
                
                <ul className="space-y-2 text-emerald-100 w-full">
                  <li className="flex items-start gap-2">
                    <FaRegCheckCircle className="text-emerald-300 mt-1 flex-shrink-0" />
                    <span>{t("Reduces landfill waste")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaRegCheckCircle className="text-emerald-300 mt-1 flex-shrink-0" />
                    <span>{t("Prevents toxic chemicals from leaking into soil")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaRegCheckCircle className="text-emerald-300 mt-1 flex-shrink-0" />
                    <span>{t("Conserves natural resources")}</span>
                  </li>
                </ul>
                
                <div className="mt-6 flex items-center w-full">
                  <div className="h-px bg-emerald-400/30 flex-grow"></div>
                  <div className="bg-emerald-500/20 rounded-full p-2 backdrop-blur-sm transform group-hover:translate-x-2 transition-transform duration-300">
                    <TbLeaf className="text-emerald-300 text-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Economic Benefits */}
            <div className='relative group overflow-hidden rounded-xl shadow-xl'>
              <div className="absolute inset-0 bg-gradient-to-br from-[#174B3A]/90 to-[#276e5a]/60 opacity-90 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative p-8 h-full flex flex-col items-center">
                <div className="mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <div className="bg-white/10 p-4 rounded-lg inline-block backdrop-blur-sm">
                    <MdOutlineMonetizationOn size={40} className="text-emerald-300" />
                  </div>
                </div>
                <h2 className='text-center text-2xl sm:text-[28px] font-bold mb-4 font-roboto'>
                  {t("Economic Benefits")}
                </h2>
                <p className='text-[16px] sm:text-[18px] font-inter text-center text-emerald-100 mb-6'>
                  {t("Users can earn money from their e-waste while supporting a circular economy, encouraging more responsible and profitable disposal habits")}.
                </p>
                
                <ul className="space-y-2 text-emerald-100 w-full">
                  <li className="flex items-start gap-2">
                    <FaRegCheckCircle className="text-emerald-300 mt-1 flex-shrink-0" />
                    <span>{t("Get competitive price offers from multiple buyers")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaRegCheckCircle className="text-emerald-300 mt-1 flex-shrink-0" />
                    <span>{t("Earn reward points for future purchases")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaRegCheckCircle className="text-emerald-300 mt-1 flex-shrink-0" />
                    <span>{t("Transparent pricing model")}</span>
                  </li>
                </ul>
                
                <div className="mt-6 flex items-center w-full">
                  <div className="h-px bg-emerald-400/30 flex-grow"></div>
                  <div className="bg-emerald-500/20 rounded-full p-2 backdrop-blur-sm transform group-hover:translate-x-2 transition-transform duration-300">
                    <RiRotateLockFill className="text-emerald-300 text-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Second Section */}
      <div className='bg-gradient-to-b from-[#e8eeea] to-[#DCE2DE] py-20 relative overflow-hidden'>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#174B3A]/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#174B3A]/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className={`flex flex-col lg:flex-row justify-center items-center gap-12 w-11/12 md:w-10/12 mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Text Content */}
          <div className='lg:w-[52%] flex flex-col justify-center items-center lg:items-start gap-8 p-2'>
            <h2 className='text-center lg:text-left text-3xl sm:text-4xl lg:text-5xl font-bold font-roboto leading-tight'>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#174B3A] to-[#28735A]">
                {t("Turning the Tide on E-Waste: A Sustainable Solution for Digital World")}
              </span>
            </h2>
            <p className='text-xl sm:text-2xl font-semibold text-[#28735A]/80 max-w-[500px] text-center lg:text-left font-poppins'>
              {t("Turn your own gadgets into green rewards")}
            </p>
            
            {/* Trust indicators */}
            <div className="w-full flex flex-col gap-4 mb-2">
              <div className="flex items-center gap-3">
                <RiShieldCheckLine className="text-[#277158] text-2xl" />
                <span className="text-[#174B3A] font-medium">{t("Verified and trusted recyclers")}</span>
              </div>
              <div className="flex items-center gap-3">
                <TbRecycle className="text-[#277158] text-2xl" />
                <span className="text-[#174B3A] font-medium">{t("Compliant with environmental regulations")}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaRegCheckCircle className="text-[#277158] text-2xl" />
                <span className="text-[#174B3A] font-medium">{t("Secure data wiping guaranteed")}</span>
              </div>
            </div>
            
            <button className='group bg-gradient-to-r from-[#277158] to-[#4C9E93] text-[18px] sm:text-[20px] py-3 sm:py-4 px-8 sm:px-10 font-medium rounded-lg text-white hover:shadow-lg hover:shadow-[#4C9E93]/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3'>
              <Link to="/signup" className="flex items-center gap-2">
                {t("Get Started Now")}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </button>
          </div>

          {/* Image with enhanced styling */}
          <div className='lg:w-[48%]'>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#174B3A] to-[#4C9E93] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <img 
                  src={bulbImageURL} 
                  className='rounded-xl w-full h-auto shadow-xl transform group-hover:scale-[1.01] transition-all duration-300' 
                  alt='Lightbulb with plants inside representing green technology' 
                />
                
                {/* Image overlay badge */}
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-all duration-300">
                  <div className="bg-gradient-to-r from-[#174B3A] to-[#4C9E93] text-white text-xs font-bold uppercase p-1 rounded-full px-3">
                    {t("Certified")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why_sell;