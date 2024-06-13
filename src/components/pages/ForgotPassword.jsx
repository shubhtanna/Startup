import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import RESET from "../../assets/Reset_password_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getPasswordResetToken } from "../../Services/Operation/authAPI";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-[80%]  shadow-2xl m-3 flex flex-col rounded-3xl justify-center items-center ">
          <div className="flex text-section-rgba font-roboto text-[1.15rem] p-5 -ml-[63rem]">
            <FaAngleLeft className="mt-1" />
            <Link to="/login">
              <p className="font-roboto font-medium">Back to login</p>
            </Link>
          </div>
          <div className="">
            <img className="w-[14.6rem] h-[10.75rem] " src={RESET} alt="" />
          </div>
          <div className=" text-section-rgba text-3xl font-roboto font-bold">
            <p>Reset your password!</p>
          </div>
          <div className="w-[28%] text-center text-section-rgba font-roboto mt-1 font-medium">
            <p>
              Have no fear. We’ll email the instructions to reset your password.{" "}
            </p>
          </div>
          <form onSubmit={handleOnSubmit}>
          <div className="w-[30%]">
            <label
              for="email"
              class="block mb-2 mt-3 font-medium text-gray-900 text-xl text-loginitem font-roboto"
            >
              Email
            </label>
            <div className="relative">
              <input
                className=" bg-loginfieldbg transition-all duration-200 hover:scale-105 font-roboto"
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered mail"
              />
              <MdOutlineEmail
                className="absolute right-3 top-[18px] z-[10] cursor-pointer opacity-20"
                size={30}
              />
            </div>
          </div>
          <div className="">
            <button className=" bg-register-rgba m-auto p-4 px-10 rounded-3xl tracking-widest w-[100%] transition-all duration-200 hover:scale-105 text-white flex justify-center text-xl mb-6 mt-4 font-semibold font-roboto">
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
