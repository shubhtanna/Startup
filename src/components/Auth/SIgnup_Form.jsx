import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../Services/Operation/authAPI";
import { setSignupData } from "../../Slices/authSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const SIgnup_Form = () => {

  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountType: "",
    city: "",
    pincode: "",
    state: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    firstName,
      lastName,
      email,
      accountType,
      city,
      pincode,
      state,
      address,
      password,
      confirmPassword,
  } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
    };

    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      accountType: "",
      city: "",
      pincode: "",
      state: "",
      address: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
    <form onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder={t("First name")}
            onChange={handleOnChange}
            className="input_feild text-[#174B3A]"
          />

          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder={t("Last name")}
            className="input_feild"
          />
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={email}
            placeholder={t("Email")}
            onChange={handleOnChange}
            className="input_feild"
          />

          <MdOutlineEmail
            className="absolute right-3 top-[20px] z-[10] cursor-pointer opacity-20"
            size={30}
          />
        </div>

        <div className="flex gap-3">
          <select
              name="accountType"
              className="input_feild"
              onChange={handleOnChange}
              value={accountType} // Ensure the value is correctly set
            >
              <option value="" disabled className="input_feild opacity-20">
                {t("Account Type")}
              </option>
              <option value="Vendor" className="input_feild opacity-20">
                {t("Vendor")}
              </option>
              <option value="Individual" className="input_feild">
                {t("Individual")}
              </option>
            </select>


          <input
          type="text"
          name="city"
          
          value={city}
          onChange={handleOnChange}
          placeholder={t("City")}
          className="input_feild"
        />
        </div>

        <div className="flex gap-3">
        <input
          type="text"
          name="pincode"
          
          value={pincode}
          onChange={handleOnChange}
          placeholder={t("Pincode")}
          className="input_feild"
        />
          <input
          type="text"
          name="state"
          
          value={state}
          onChange={handleOnChange}
          placeholder={t("State")}
          className="input_feild"
        />
        </div>

        <input
          type="text"
          name="address"
          
          value={address}
          onChange={handleOnChange}
          placeholder={t("Address")}
          className="input_feild"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            
            value={password}
            onChange={handleOnChange}
            placeholder={t("Password")}
            className="input_feild"
          />
          
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[9px] z-[10] cursor-pointer opacity-20"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={30} />
            ) : (
              <AiOutlineEye size={30} />
            )}
          </span>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder={t("Confirm Password")}
            className="input_feild"
          />

          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[9px] z-[10] cursor-pointer opacity-20"
          >
            {showConfirmPassword ? (
              <CiLock size={30} />
            ) : (
              <CiUnlock size={30} />
            )}
          </span>
        </div>

        <div className=" text-center mt-3">
          <button
            type="submit"
            className=" bg-[#F19A3E] text-white py-2 px-14 rounded-3xl text-[28px] font-semibold hover:scale-105 transition-all duration-200 font-roboto"
          >
           {t("Get OTP")} 
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default SIgnup_Form;
