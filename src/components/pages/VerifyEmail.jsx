import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa";
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signup } from '../../Services/Operation/authAPI';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otpImageURL, setOtpImageURL] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/OTP_image.png');
        const url = await getDownloadURL(imageRef);
        setOtpImageURL(url);
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
      }
    };
    fetchImage();

  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
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
    } = signupData;

    dispatch(
      signup(
        firstName,
        lastName,
        email,
        accountType,
        city,
        pincode,
        state,
        address,
        password,
        confirmPassword, otp,
        navigate
      )
    );
  };

  return (
    <div className='bg-[#DCE2DE] py-10 sm:py-16 md:py-20'>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className='w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white mx-auto rounded-3xl p-8 md:p-12 lg:p-16'>
          <div className='flex items-center gap-1 justify-start mb-6'>
            <Link to="/signup" className="flex items-center gap-2">
              <FaAngleLeft size={24} />
              <p className='text-[#174B3A] text-lg md:text-xl font-roboto font-medium'>
                Back to Signup
              </p>
            </Link>
          </div>

          <div className='flex flex-col gap-6 items-center justify-center text-center'>
            <img src={'https://firebasestorage.googleapis.com/v0/b/t-music-be993.appspot.com/o/E-Waste%2FOTP_Image.png?alt=media&token=6f76e400-09b7-408d-8e17-a8e2deec9da4'} alt='OTP' className="w-40 sm:w-52 md:w-60 lg:w-64" />

            <h2 className='text-[#174B3A] text-3xl sm:text-4xl md:text-5xl font-roboto font-semibold'>
              Verify Email
            </h2>

            <p className='text-[#174B3A] text-lg sm:text-xl md:text-2xl max-w-[300px]'>
              A verification code was sent to <span className='font-medium'>*****k41@icloud.com</span>
            </p>

            <form onSubmit={handleVerifyAndSignup} className='w-full flex flex-col items-center'>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>--</span>}
                renderInput={(props) => (
                  <input {...props}
                    placeholder='-'
                    className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border-0 bg-black text-white rounded-md text-center 
                    focus:outline-none placeholder-opacity-50'
                  />
                )}
                containerStyle="gap-3 sm:gap-4 md:gap-5"
              />

              <div className='mt-8 sm:mt-10'>
                <button
                  type="submit"
                  className='bg-[#F19A3E] text-white py-3 px-10 sm:py-4 sm:px-12 rounded-full text-lg sm:text-xl md:text-2xl font-semibold hover:scale-105 transition-transform duration-200'
                >
                  Verify email
                </button>
              </div>
            </form>

            <p className='text-lg sm:text-xl md:text-2xl max-w-lg'>
              Didn’t receive the verification email?
              <span className='font-medium text-[#FFBA08] underline'>
                <Link onClick={() => dispatch(sendOtp(signupData.email))}> Resend it</Link>
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
