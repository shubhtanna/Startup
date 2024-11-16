import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import REWARD from '../../assets/Reward_image.png'
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constant';
import { useTranslation } from 'react-i18next';

const MyProfile = () => {
const { user } = useSelector((state) => state.profile)
  
  const { t } = useTranslation();
  const historyCardData = [
    {
      name: "Redmi Note 9 pro",
      model: "AJIX3421",
      type: "Smartphone",
      amount: "100",
      id: "abc1234",
    },
    {
      name: "Redmi Note 9 pro",
      model: "AJIX3421",
      type: "Smartphone",
      amount: "100",
      id: "abc1234",
    }
  ]

  const location = useLocation();
  return (
    <div className='bg-[#DCE2DE] p-4 md:px-10'>
      {/* Breadcrumb */}
      <div className='text-base md:text-lg font-medium font-roboto'>
        Home / dashboard / <span className='text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span>
      </div>
      {/* Profile Section */}
      <div className='flex flex-col gap-3 mt-10'>
        <p className='text-lg md:text-2xl font-medium font-roboto'>Profile</p>
        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>
          <div className='flex flex-col lg:flex-row justify-between items-center mx-auto lg:max-w-[90%] gap-6'>
            {/* Profile Image and Details */}
            <div className='flex flex-col md:flex-row items-center gap-x-5 gap-y-3'>
              <div className='h-[100px] w-[100px] rounded-full'>
                <img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-[100px] rounded-full object-cover"
                />
              </div>
              <div className='text-center md:text-left'>
                <p className='font-roboto font-medium text-[18px] md:text-[22px]'>{user?.firstName + " " + user?.lastName}</p>
                <p className='font-roboto font-medium opacity-75 text-[16px] md:text-[20px]'>{user?.email}</p>
                <Link to="/dashboard/settings" className="underline text-[#A27647] text-[14px] md:text-[16px] font-roboto">Edit profile pic</Link>
              </div>
            </div>
            {/* Reward Section */}
            <div className='text-center'>
              <div className='flex items-center justify-center md:justify-start'>
                <img src={REWARD} width={40} height={30} />
                <div className='ml-2'>
                  <p className='text-[#174B3A] font-medium font-roboto text-lg'>Reward points</p>
                  <p className='text-[#174B3A] font-black font-roboto text-xl'>100</p>
                </div>
              </div>
              <div className='flex justify-center mt-3'>
                <Link to="/dashboard/redeem-award" className='font-roboto font-medium text-[#fff] text-sm bg-[#F19A3E] rounded-full px-7 py-2'>
                  Redeem now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Personal details Section */}
      <div className='flex flex-col gap-3 mt-10'>
        <div className='flex justify-between'>
          <p className='text-lg md:text-2xl font-medium font-roboto'>Personal details</p>
          <Link to="/dashboard/settings" className='underline text-[#A27647] text-md md:text-xl font-roboto'>Edit details</Link>
        </div>

        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6'>
            <div>
              <p className='font-medium text-lg md:text-xl font-roboto'>Name</p>
              <p className='font-medium text-md md:text-lg font-roboto opacity-75'>{user?.firstName}</p>
            </div>
            <div>
              <p className='font-medium text-lg md:text-xl font-roboto'>Gender</p>
              <p className='font-medium text-md md:text-lg font-roboto opacity-75'>{user?.profile?.gender}</p>
            </div>
            <div>
              <p className='font-medium text-lg md:text-xl font-roboto'>Date Of Birth</p>
              <p className='font-medium text-md md:text-lg font-roboto opacity-75'>{user?.profile?.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className='flex flex-col gap-3 mt-10'>
        <div className='flex justify-between'>
          <p className='text-lg md:text-2xl font-medium font-roboto'>History</p>
          <button className='underline text-[#A27647] text-md md:text-xl font-roboto'>see All</button>
        </div>

        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>
          <div className='flex flex-col gap-4 mx-auto px-4'>
            {historyCardData.map((card, index) => (
              <div key={index} className='bg-white rounded-2xl py-4 px-6'>
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                  <div>
                    <p className='font-medium text-lg md:text-xl font-roboto'>{card.name}</p>
                    <p className='font-medium text-sm md:text-md opacity-75 font-inter'>{card.model}</p>
                    <p className='font-roboto font-medium text-md md:text-lg'>Type: <span>{card.type}</span></p>
                  </div>
                  <div>
                    <p className='font-medium text-md md:text-lg font-roboto'>Amount: <span>{card.amount}</span></p>
                    <p>Shopkeeper ID: <span>{card.id}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile;
