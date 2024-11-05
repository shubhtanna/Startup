import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import REWARD from '../asets/Reward_image.png'
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';

const ShopkeeperProfile = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className=' bg-[#DCE2DE]'>
      <div className=' text-xl font-medium font-roboto'>{t("Home / dashboard /")} <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></div>
      <div className=' flex flex-col gap-1 mt-10'>
        <p className=' text-xl font-medium font-roboto'>{t("Profile")}</p>
        <div className=' bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>
          <div className='flex justify-between items-center  mx-auto lg:max-w-[90%]'>
            <div className='flex gap-x-10'>
              <div className='flex flex-col gap-1'>
                <p className=' font-roboto font-medium text-[20px]'>patel parth</p>
                <p className=' font-roboto font-medium opacity-50 text-[20px]'>patel41@gmail.com</p>
                <Link className="underline text-[#A27647] text-[16px] font-roboto ">Edit profile pic</Link>
              </div>
            </div>
            <div>
              <div>
                <div className='flex'>
                  <img src={REWARD} width={50} height={40} />
                  <div>
                    <p className='text-[#174B3A] font-medium font-roboto text-xl'>{t("Reward points")}</p>
                    <p className='text-[#174B3A] font-black font-roboto text-xl'>100</p>
                  </div>
                </div>

                <div className='flex justify-center mt-3'>
                  <button className=' font-roboto font-medium text-[#fff] text-[14px] bg-[#F19A3E] rounded-full px-7 py-2'>{t("Redeem now")} </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal detail Section */}
      <div className=' flex flex-col gap-1 mt-10'>
        <div className='flex justify-between'>
          <p className=' text-xl font-medium font-roboto'>{t("Personal details")}</p>
          <Link className='underline text-[#A27647] text-xl font-roboto mr-2'>{t("Edit details")}</Link>
        </div>

        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>
          <div className='flex justify-between mx-auto lg:max-w-[90%]'>
            <div className=' flex flex-col gap-10'>
              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("Name")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>{t("patel")} </p>
              </div>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("Email")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>abc1234@gmail.com</p>
              </div>
            </div>

            <div className=' flex flex-col gap-10'>
              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("Address")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>{t("Waghodiya, Vadodara")}</p>
              </div>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("State/Country")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>{t("Gujarat/India")}</p>
              </div>
            </div>

            <div className=' flex flex-col gap-10'>
              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("Account Type")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>{t("Shopkeeper")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* shop details */}
      <div className=' flex flex-col gap-1 mt-10'>
        <div className='flex justify-between'>
          <p className=' text-xl font-medium font-roboto'>{t("Shop details")}</p>
          <Link className='underline text-[#A27647] text-xl font-roboto mr-2'>{t("Edit details")}</Link>
        </div>
        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>
          <div className='flex justify-between mx-auto lg:max-w-[90%]'>
            <div className=' flex flex-col gap-10'>
              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("Shop Name")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>{t("Abc electronic shop")}</p>
              </div>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("GST Number")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>ABC1234</p>
              </div>
            </div>

            <div className=' flex flex-col gap-10'>
              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("Address")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50 w-[80%]'>{t("Abc road, Waghodiya, Vadodara")}</p>
              </div>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("State/Country")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>{t("Gujarat/India")}</p>
              </div>
            </div>

            <div className=' flex flex-col gap-10'>
              <div>
                <p className=' font-medium text-[22px] font-roboto'>{t("GST Invoice")}</p>
                <p className=' font-medium text-xl font-roboto opacity-50'>/</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopkeeperProfile


