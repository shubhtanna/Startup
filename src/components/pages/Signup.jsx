import React, { useState, useEffect } from 'react';
import SIgnup_Form from '../Auth/SIgnup_Form';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const Signup = () => {
  const { t } = useTranslation();
  const [signupImageURL, setSignupImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/signup_image.png');
        const url = await getDownloadURL(imageRef);
        setSignupImageURL(url);
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
      }
    };
    fetchImage();
  }, []);

  return (
    <div className="bg-[#DCE2DE] pt-10 pb-10 lg:pt-20 lg:pb-20">
      <div className="w-11/12 lg:w-10/12 flex flex-col lg:flex-row justify-between items-center bg-white mx-auto rounded-3xl p-5 lg:p-10 space-y-5 lg:space-y-0 lg:space-x-10">

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 space-y-5 lg:space-y-10">
          <h2 className="font-roboto font-semibold text-3xl lg:text-4xl text-[#174B3A] max-w-[250px] text-center">
            {t("New User? Join Us Now!")}
          </h2>
          <SIgnup_Form />
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={signupImageURL}
            alt="Signup"
            className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[70%] xl:w-[60%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
