import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
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

  return (
    <div className="bg-box-rgba p-5">
      <div className="flex flex-col md:flex-row justify-evenly mb-4 font-inter text-white">
        {/* box-1 */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          {logoImageURL ? (
            <img src={logoImageURL} alt="Logo" className="w-24 h-auto" />
          ) : (
            <p>{t("LOGO")}</p>
          )}
        </div>
        
        {/* box-2 */}
        <div className="text-center md:text-left">
          <div className="text-2xl p-3">
            <p>{t("Page")}</p>
          </div>
          <div className="text-sm ml-5 mt-3">
            <ul className="space-y-3 text-footeritem">
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("Home")}</Link>
              </li>
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("About")}</Link>
              </li>
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("FAQs")}</Link>
              </li>
              <li className="hover:pl-2 transition-all duration-200">
                <Link to={"/"}>{t("Purchase")}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* box-3 */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="text-2xl p-3">
            <p>{t("Connect with Us")}!</p>
          </div>
          <div className="text-sm ml-5 mt-3">
            <ul className="space-y-3 text-footeritem">
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("Address")}</Link>
              </li>
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("Location")}</Link>
              </li>
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("Email")}</Link>
              </li>
              <li className="hover:pl-3 transition-all duration-200">
                <Link to={"/"}>{t("Team")}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* box-4 */}
        <div className="text-center md:text-left">
          <div>{t("Get More Info")}</div>
          <div className="flex justify-center md:justify-start mt-3">
            <Link to={"/"}>
              <div className="p-2 transition-all duration-200">
                <FaLinkedinIn className="text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba" />
              </div>
            </Link>
            <Link to={"/"}>
              <div className="p-2 transition-all duration-200">
                <FaFacebookF className="text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba" />
              </div>
            </Link>
            <Link to={"/"}>
              <div className="p-2 transition-all duration-200">
                <FaYoutube className="text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-3">
        <Link to={"/"} className="flex">
          <p>@Copyright</p>
          <p className="ml-5">{t("Terms and conditions")} <span>{t("applied")}</span></p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
