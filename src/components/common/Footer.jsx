import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  const {t} = useTranslation();
  return (
    <div>


        <div className='flex justify-evenly mb-4 font-inter text-white bg-box-rgba p-7'>
    {/* box-1 */}
      <div>
        LOGO
      </div>
      {/* box-2 */}
      <div>
        <div className=' text-2xl p-3 '>
            <p>{t("Page")}</p>
            </div>
            <div className=' text-sm ml-5 mt-3'>
                <ul className=' space-y-3 text-footeritem'>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("Home")}</Link></li>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("About")}</Link></li>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("FAQs")}</Link></li>
                    <li className='hover:pl-2 transition-all duration-200'><Link to={"/"}>{t("Purchase")}</Link></li>
                </ul>
            </div>
        
      </div>
      {/* box-3 */}
      <div>
      <div className=' text-2xl p-3'>
            <p>{t("Connect with Us")}!</p>
        </div>
            <div className=' text-sm ml-5 mt-3'>
                <ul className=' space-y-3 text-footeritem'>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("Address")}</Link></li>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("Location")}</Link></li>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("Email")}</Link></li>
                    <li className='hover:pl-3 transition-all duration-200'><Link to={"/"}>{t("Team")}</Link></li>
                </ul>
            </div>
        
      </div>
      {/* box-4 */}
      <div>
       <div>{t("Get More Info")}</div>
       
       <div className='flex group'>
       <Link to={"/"}>
       <div className='p-2 transition-all duration-200 group-hover:scale-[0.80] hover:!scale-100 '>
       <FaLinkedinIn className=' text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba '/>
       </div>
       </Link>
       <Link to={"/"}>
       <div className='p-2 transition-all duration-200 group-hover:scale-[0.80] hover:!scale-100'>
       <FaFacebookF className=' text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba '/>
       </div>
       </Link>
       <Link to={"/"}>
       <div className='p-2 transition-all duration-200 group-hover:scale-[0.80] hover:!scale-100'>
       <FaYoutube className=' text-box-rgba text-3xl rounded-full bg-white p-2 hover:bg-register-rgba hover:text-section-rgba '/>
       </div>
       </Link>
       </div> 
      </div>
    </div>
    <div className='flex justify-center mb-3'>
    <Link to={"/"} className='flex'>
    <p>@Copyright</p>
    <p className='ml-5'>{t("Terms and conditions")} <span>{t("applied")}</span> </p>
    </Link>
      
    </div>
    </div>
    
  )
}

export default Footer

