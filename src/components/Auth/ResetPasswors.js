import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import forgot from '../../assets/reset.png';
import { FaAngleLeft } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-3/5 shadow-2xl flex flex-col rounded-3xl justify-center items-center p-8">
        <Link to="/" className="flex text-[#174b3a] font-roboto text-lg mb-8">
          <FaAngleLeft className="mr-1 mt-1" />
          <p>{t("Back to login")}</p>
        </Link>
        
        <div className="relative text-center mb-10">
          <img src={forgot} alt="Forgot Password" className="w-20 h-20 absolute left-1/2 transform -translate-x-1/2 -translate-y-12 -rotate-12" />
          <h2 className="text-[#174b3a] text-3xl font-roboto font-semibold">{t("Reset your password")}</h2>
          <p className="text-lg font-medium text-gray-700 mt-2 w-4/5 mx-auto">{t("Forgot your old password? Enter your password and you're all set.")}</p>
        </div>

        <form className="w-1/2 space-y-6">
          <div className="relative">
            <label htmlFor="newPassword" className="block text-xl font-medium text-gray-600">
              {t("New password")} <span className="text-red-700">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="••••••"
                className="w-full bg-[#499f682b] p-3 rounded-md placeholder:text-2xl transition-transform duration-200 hover:scale-105"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-xl font-medium text-gray-600">
              {t("Confirm password")} <span className="text-red-700">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••"
                className="w-full bg-[#499f682b] p-3 rounded-md placeholder:text-2xl transition-transform duration-200 hover:scale-105"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#f19a3e] p-4 rounded-3xl w-3/5 mx-auto text-white text-xl font-medium tracking-widest transition-transform duration-200 hover:scale-105"
          >
            {t("Reset password")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
