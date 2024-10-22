import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../../Services/Operation/authAPI";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [resetImageURL, setResetImageURL] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "gs://t-music-be993.appspot.com/E-Waste/reset.png");
        const url = await getDownloadURL(imageRef);
        setResetImageURL(url);
      } catch (error) {
        console.error("Error fetching image from Firebase Storage:", error);
      }
    };
    fetchImage();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-2xl m-5 rounded-3xl flex flex-col justify-center items-center p-8 lg:p-16">
          {/* Back to Login link */}
          <div className="flex items-center w-full mb-5">
            <FaAngleLeft className="mr-2" />
            <Link to="/login">
              <p className="text-lg font-medium">{t("Back to login")}</p>
            </Link>
          </div>

          {/* Image */}
          <div className="mb-6">
            <img
              className="w-[14.6rem] h-[10.75rem] object-contain mx-auto"
              src={resetImageURL}
              alt="Reset Password"
            />
          </div>

          {/* Reset Password Heading */}
          <div className="text-center text-3xl font-bold mb-3">
            <p>{t("Reset your password")}!</p>
          </div>

          {/* Instructions */}
          <div className="text-center text-lg font-medium mb-6 max-w-lg">
            <p>{t("Have no fear. We'll email the instructions to reset your password")}</p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleOnSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-xl font-medium"
              >
                {t("Email")}
              </label>
              <div className="relative">
                <input
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("Enter your registered mail")}
                />
                <MdOutlineEmail className="absolute right-3 top-[18px] z-[10] opacity-20" size={30} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                className="w-full bg-blue-600 text-white py-3 px-5 rounded-3xl tracking-widest transition-all duration-200 hover:scale-105 font-semibold text-lg"
              >
                {!emailSent ? t("Submit") : t("Resend Email")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
