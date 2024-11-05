import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const Footer = () => {
  const { t } = useTranslation();
  const [logoImageURL, setLogoImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "gs://t-music-be993.appspot.com/E-Waste/LOGO.png");
        const url = await getDownloadURL(imageRef);
        setLogoImageURL(url);
      } catch (error) {
        console.error("Error fetching image from Firebase Storage:", error);
      }
    };
    fetchImage();
  }, []);

  const socialLinkClasses =
    "p-2 rounded-full bg-white text-box-rgba hover:bg-register-rgba hover:text-section-rgba transition-all duration-200";
  const sectionHeaderClasses = "text-xl mb-4";

  return (
    <div className="bg-box-rgba p-8 text-white font-inter">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          {logoImageURL ? (
            <img src={logoImageURL} alt="Logo" className="w-24 h-auto mb-4" />
          ) : (
            <p>{t("LOGO")}</p>
          )}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mt-1 sm:mt-2 md:mt-3">
            {t("Reduce, Reuse, Recycle: Keep E-Waste in Check!")}
          </p>
        </div>

        {/* Page Links */}
        <div className="text-center md:text-left">
          <h4 className={sectionHeaderClasses}>{t("Page")}</h4>
          <ul className="space-y-2">
            {["Home", "About", "FAQs", "Purchase"].map((page) => (
              <li key={page}>
                <Link to="/" className="hover:underline">{t(page)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect with Us */}
        <div className="text-center md:text-left">
          <h4 className={sectionHeaderClasses}>{t("Connect with Us")}</h4>
          <ul className="space-y-2">
            {["Address", "Location", "Email", "Team"].map((item) => (
              <li key={item}>
                <Link to="/" className="hover:underline">{t(item)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className={sectionHeaderClasses}>{t("Get More Info")}</h4>
          <div className="flex space-x-4">
            {[FaLinkedinIn, FaFacebookF, FaYoutube].map((Icon, index) => (
              <Link key={index} to="/" className={socialLinkClasses}>
                <Icon className="text-2xl" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 pt-4">
        <Link to="/" className="flex justify-center items-center text-sm text-gray-400">
          <span>&copy; {new Date().getFullYear()} E-Waste Trader</span>
          <span className="ml-2">{t("Terms and conditions applied")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
