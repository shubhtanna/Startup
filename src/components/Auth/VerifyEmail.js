import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa";
import verifyemail from '../asets/email.png'

const VerifyEmail = () => {
  return (
<div className='w-[100vw] h-[100vh] flex justify-center items-center'>
    
    <div className='w-[60%]  shadow-2xl  flex flex-col rounded-3xl justify-center items-center '>
    
    <div className='flex text-[#174b3a] font-roboto text-[1.15rem] mt-1 -ml-[47rem]'>
    <Link to={"/"} className='flex'>
    <FaAngleLeft className='mt-1'/>
    <p>Back to login</p>
    </Link>
   
  </div>
  <div className=''>
    <img className='w-[14.6rem] h-[10.75rem] ' src={verifyemail} alt="" />
  </div>
  <div className=' text-[#174b3a] text-3xl font-roboto font-bold space-y-5 mt-5'>
    <p>Verify Email</p>
  </div>
  <div className='w-[28%] text-center text-[#174b3a] font-roboto mt-1 font-medium'>
    <p>We have sent a reset email to abc1234@gmail.com</p>
  </div>
  <form action="">
    <div className=''>
             <button className=' bg-[#f19a3e] m-auto p-4 rounded-3xl tracking-widest w-[100%] transition-all duration-200 hover:scale-105 text-white flex justify-center text-xl mb-6 mt-4'>Reset password</button>
             </div>
  </form>
</div>
</div>
  )
}

export default VerifyEmail
