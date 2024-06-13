import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import OTP from '../../assets/OTP_Image.png'
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp,signup } from '../../Services/Operation/authAPI';

const VerifyEmail = () => {

    const [otp, setOtp] = useState('');
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
          }
    },[])

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
            confirmPassword,otp,
            navigate
          )
        );
      };

    return (
        <div className='bg-[#DCE2DE] pt-20 pb-20'>

        {loading ? (<div>
          <div className="spinner"></div>
        </div>) : (
            <div className='w-10/12 bg-[#fff] mx-auto rounded-3xl p-10'>

                <div className='flex items-center gap-1 justify-start'>
                <Link to="/signup">
                    <FaAngleLeft size={28} />
                    <p className=' text-[#174B3A] text-[18px] font-roboto font-medium'>Back to Signup</p>
                    </Link>
                </div>

                <div className='flex flex-col gap-5 items-center justify-center'>
                    <img src={OTP} alt='' width={250} height={170} />

                    <h2 className=' text-[#174B3A] text-4xl font-roboto font-semibold'>Verify Email</h2>

                    <p className=' text-[#174B3A] text-[18px] font-roboto font-normal max-w-[300px] text-center'>A verification code was sent to <span className=' font-medium'>*****k41@icloud.com</span></p>

                    <form onSubmit={handleVerifyAndSignup}> 
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>--</span>}
                            renderInput={(props) => (<input {...props}
                                placeholder='-'

                                style={{ boxShadow: "inset 0px-1px 0px rgba(255,255,255,0.18)" }}
                                className=' w-[48px] lg:w-[60px] border-0 bg-black rounded-[0.5rem] text-white placeholder:opacity-50
        aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50'
                            />)}
                        />

                        <div className=' mt-10 text-center'>
                            <button className=' bg-[#F19A3E] text-white py-4 px-12 rounded-3xl text-[28px] font-semibold hover:scale-105 transition-all duration-200 font-roboto'>
                                Verify email
                            </button>
                        </div>
                    </form>

                    <p className=' font-roboto text-2xl font-normal max-w-[400px] text-center'>Didn’t received verification mail? <span className=' font-medium text-[#FFBA08] underline'><Link onClick={() => dispatch(sendOtp(signupData.email))}>Resend it</Link></span></p>
                </div>
            </div>
        )}

        </div>
    )
}

export default VerifyEmail
