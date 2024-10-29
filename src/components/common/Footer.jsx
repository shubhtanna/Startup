// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { FaFacebookF } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
// import { getDownloadURL, ref } from 'firebase/storage';
// import { storage } from '../../utils/firebaseConfig';

// const Footer = () => {
//   const { t } = useTranslation();
//   const [logoImageURL, setLogoImageURL] = useState('');

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const imageRef = ref(storage, "gs://t-music-be993.appspot.com/E-Waste/LOGO.png");
//         const url = await getDownloadURL(imageRef);
//         setLogoImageURL(url);
//       } catch (error) {
//         console.error("Error fetching image from Firebase Storage:", error);
//       }
//     };
//     fetchImage();
//   }, []);

//   return (
//     <div className="bg-box-rgba p-5">
//       <div className="flex flex-col md:flex-row justify-evenly mb-4 font-inter text-white">
//         {/* box-1 */}
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           {logoImageURL ? (
//             <img src={logoImageURL} alt="Logo" className="w-24 h-auto" />
//           ) : (
//             <p>{t("LOGO")}</p>
//           )}
//         </div>

//         {/* box-2 */}
//         <div className="text-center md:text-left">
//           <div className="text-2xl p-3">
//             <p>{t("Page")}</p>
//           </div>
//           <div className="text-sm ml-5 mt-3">
//             <ul className="space-y-3 text-footeritem">
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("Home")}</Link>
//               </li>
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("About")}</Link>
//               </li>
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("FAQs")}</Link>
//               </li>
//               <li className="hover:pl-2 transition-all duration-200">
//                 <Link to={"/"}>{t("Purchase")}</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* box-3 */}
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <div className="text-2xl p-3">
//             <p>{t("Connect with Us")}!</p>
//           </div>
//           <div className="text-sm ml-5 mt-3">
//             <ul className="space-y-3 text-footeritem">
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("Address")}</Link>
//               </li>
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("Location")}</Link>
//               </li>
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("Email")}</Link>
//               </li>
//               <li className="hover:pl-3 transition-all duration-200">
//                 <Link to={"/"}>{t("Team")}</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* box-4 */}
//         <div className="text-center md:text-left">
//           <div>{t("Get More Info")}</div>
//           <div className="flex justify-center md:justify-start mt-3">
//             <Link to={"/"}>
//               <div className="p-2 transition-all duration-200">
//                 <FaLinkedinIn className="text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba" />
//               </div>
//             </Link>
//             <Link to={"/"}>
//               <div className="p-2 transition-all duration-200">
//                 <FaFacebookF className="text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba" />
//               </div>
//             </Link>
//             <Link to={"/"}>
//               <div className="p-2 transition-all duration-200">
//                 <FaYoutube className="text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba" />
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center mb-3">
//         <Link to={"/"} className="flex">
//           <p>@Copyright</p>
//           <p className="ml-5">{t("Terms and conditions")} <span>{t("applied")}</span></p>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Footer;


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
          <h4 className="text-xl mb-4">{t("Page")}</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">{t("Home")}</Link></li>
            <li><Link to="/" className="hover:underline">{t("About")}</Link></li>
            <li><Link to="/" className="hover:underline">{t("FAQs")}</Link></li>
            <li><Link to="/" className="hover:underline">{t("Purchase")}</Link></li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div className="text-center md:text-left">
          <h4 className="text-xl mb-4">{t("Connect with Us")}</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">{t("Address")}</Link></li>
            <li><Link to="/" className="hover:underline">{t("Location")}</Link></li>
            <li><Link to="/" className="hover:underline">{t("Email")}</Link></li>
            <li><Link to="/" className="hover:underline">{t("Team")}</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl mb-4">{t("Get More Info")}</h4>
          <div className="flex space-x-4">
            <Link to="/" className="p-2 rounded-full bg-white text-box-rgba hover:bg-register-rgba hover:text-section-rgba transition-all duration-200">
              <FaLinkedinIn className="text-2xl" />
            </Link>
            <Link to="/" className="p-2 rounded-full bg-white text-box-rgba hover:bg-register-rgba hover:text-section-rgba transition-all duration-200">
              <FaFacebookF className="text-2xl" />
            </Link>
            <Link to="/" className="p-2 rounded-full bg-white text-box-rgba hover:bg-register-rgba hover:text-section-rgba transition-all duration-200">
              <FaYoutube className="text-2xl" />
            </Link>
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
