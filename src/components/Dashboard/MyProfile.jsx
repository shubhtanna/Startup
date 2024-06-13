import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import REWARD from '../../assets/Reward_image.png'
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constant';

const MyProfile = () => {

  const {user} = useSelector((state) => state.profile)

  console.log(user);

  console.log("data",user)

  const histroryCradData = [
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
    <div className=' bg-[#DCE2DE]'>

      <div className=' text-xl font-medium font-roboto'>Home / dashboard / <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></div>

      <div className=' flex flex-col gap-1 mt-10'>

        <p className=' text-xl font-medium font-roboto'>Profile</p>

        <div className=' bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>

          <div className='flex justify-between items-center  mx-auto lg:max-w-[90%]'>

            <div className='flex gap-x-10'>
              <div className=' h-[100px] w-[100px] rounded-full'>
              <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[106px] rounded-full object-cover"
          />
              </div>

              <div className='flex flex-col gap-1'>

                <p className=' font-roboto font-medium text-[20px]'>{user?.firstName + " " + user?.lastName}</p>

                <p className=' font-roboto font-medium opacity-55 text-[20px]'>{user?.email}</p>

                <Link to="/dashboard/settings" className="underline text-[#A27647] text-[16px] font-roboto ">Edit profile pic</Link>
              </div>


            </div>

            <div>

              <div>

                <div className='flex'>
                  <img src={REWARD} width={50} height={40} />

                  <div>
                    <p className='text-[#174B3A] font-medium font-roboto text-xl'>Reward points</p>
                    <p className='text-[#174B3A] font-black font-roboto text-xl'>100</p>
                  </div>
                </div>

                <div className='flex justify-center mt-3'>
                  <button className=' font-roboto font-medium text-[#fff] text-[14px] bg-[#F19A3E] rounded-full px-7 py-2'>Redeem now </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Personal detail Section */}

      <div className=' flex flex-col gap-1 mt-10'>

        <div className='flex justify-between'>

          <p className=' text-xl font-medium font-roboto'>Personal details</p>

          <Link to="/dashboard/settings" className='underline text-[#A27647] text-xl font-roboto mr-2'>Edit details</Link>
        </div>
        
        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>

          <div className='flex justify-between mx-auto lg:max-w-[90%]'>
            <div className=' flex flex-col gap-10'>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>Name</p>
                <p className=' font-medium text-xl font-roboto opacity-55'>{user?.firstName}</p>
              </div>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>Gender</p>
                <p className=' font-medium text-xl font-roboto opacity-55'>{user?.profile?.gender}</p>
              </div>
            </div>

            <div className=' flex flex-col gap-10'>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>Last Name</p>
                <p className=' font-medium text-xl font-roboto opacity-55'>{user?.lastName}</p>
              </div>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>Contact Number</p>
                <p className=' font-medium text-xl font-roboto opacity-55'>{user?.profile?.contactNumber}</p>
              </div>
            </div>

            <div className=' flex flex-col gap-10'>

              <div>
                <p className=' font-medium text-[22px] font-roboto'>Date Of Birth</p>
                <p className=' font-medium text-xl font-roboto opacity-55'>{user?.profile?.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {
        user?.accountType == ACCOUNT_TYPE.VENDOR ? (
          <div className=' flex flex-col gap-1 mt-10'>

  <div className='flex justify-between'>

    <p className=' text-xl font-medium font-roboto'>Shop details</p>

    <Link className='underline text-[#A27647] text-xl font-roboto mr-2'>Edit details</Link>
  </div>



  <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>

    <div className='flex justify-between mx-auto lg:max-w-[90%]'>
      <div className=' flex flex-col gap-10'>

        <div>
          <p className=' font-medium text-[22px] font-roboto'>Shop Name</p>
          <p className=' font-medium text-xl font-roboto opacity-50'>Abc electronic shop</p>
        </div>

        <div>
          <p className=' font-medium text-[22px] font-roboto'>GST Number</p>
          <p className=' font-medium text-xl font-roboto opacity-50'>ABC1234</p>
        </div>
      </div>

      <div className=' flex flex-col gap-10'>

        <div>
          <p className=' font-medium text-[22px] font-roboto'>Address</p>
          <p className=' font-medium text-xl font-roboto opacity-50 w-[80%]'>Abc road, Waghodiya, Vadodara</p>
        </div>

        <div>
          <p className=' font-medium text-[22px] font-roboto'>State/Country</p>
          <p className=' font-medium text-xl font-roboto opacity-50'>Gujarat/India</p>
        </div>
      </div>

      <div className=' flex flex-col gap-10'>

        <div>
          <p className=' font-medium text-[22px] font-roboto'>GST Invoice</p>
          <p className=' font-medium text-xl font-roboto opacity-50'>/</p>
        </div>
      </div>
    </div>
  </div>
  </div>


        ) : (
          <div></div>
        )
      }


      {/* History Section */}

      <div className=' flex flex-col gap-1 mt-10'>

        <div className='flex justify-between'>

          <p className=' text-xl font-medium font-roboto'>History</p>

          <button className='underline text-[#A27647] text-xl font-roboto mr-2'>see All</button>
        </div>

        <div className='bg-[#499F68] bg-opacity-[17%] rounded-2xl py-5'>

          <div className='flex flex-col gap-4 mx-auto'>

            {
              histroryCradData.map((card, index) => (
                <div key={index}>
                  <div className='  bg-white rounded-2xl mx-auto max-w-[90%]'>

                    <div className=' flex justify-between mx-auto lg:max-w-[90%] py-6'>
                      <div>

                        <p className=' font-medium text-[22px] font-roboto'>{card.name}</p>
                        <p className=' font-medium opacity-35 text-[16px] font-inter'>{card.model}</p>

                        <p className='font-roboto font-medium text-[22px]'>Type : <span>{card.type}</span></p>
                      </div>

                      <div>

                        <p className=' font-medium text-[22px] font-roboto'>Amount : <span>{card.amount}</span></p>
                        <p>Shopkeeper ID : <span>{card.id}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>


      </div>


    </div>
  )
}

export default MyProfile
