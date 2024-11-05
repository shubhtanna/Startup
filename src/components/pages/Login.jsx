import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginForm from '../Auth/LoginForm';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const Login = () => {
  const [loginImageURL, setLoginImageURL] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/login_image.png');
        const url = await getDownloadURL(imageRef);
        setLoginImageURL(url);
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
      }
    };
    fetchImage();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-2xl m-5 rounded-3xl flex flex-col lg:flex-row">

        {/* Left Side (Text and Form Section) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-10">
          <div className="flex items-center mb-4">
            <FaAngleLeft className="mr-2" />
            <Link to="/signup">
              <p className="text-lg font-roboto font-medium">{t('Back to signup')}</p>
            </Link>
          </div>
          <div className="text-section-rgba ml-2 lg:ml-8">
            <h1 className="text-3xl lg:text-4xl font-roboto font-semibold mb-2">{t('Welcome Back')}!</h1>
            <p className="text-xl lg:text-2xl font-roboto font-medium mb-6">{t('Login to get back your account')}</p>
            <LoginForm />
          </div>
        </div>

        {/* Right Side (Image Section) */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
          <img
            src={loginImageURL}
            alt="Login"
            className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[80%] xl:w-[70%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
