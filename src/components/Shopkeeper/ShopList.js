import React, { useEffect, useState } from 'react'
import { ShopCard } from './ShopCard';
import { IoAdd } from "react-icons/io5";
import ShopListImage from '../../assets/ShopListImage1.png';
import { getShopbyCity } from '../../Services/Operation/vendorAPI';
import { useSelector } from 'react-redux';


const shopData = [
  {
    name: 'Tanna electronics shop',
    gstNumber: '22AAAAA0000A1Z5',
    location: 'Near Palace Nirma, Veraval',
  },
  {
    name: 'Ravi electronics store',
    gstNumber: '33BBBBB1111B2Y6',
    location: 'Main Market, Rajkot',
  },
  {
    name: 'Patel gadget hub',
    gstNumber: '44CCCCC2222C3Z7',
    location: 'MG Road, Ahmedabad',
  },
  {
    name: 'Tanna electronics shop',
    gstNumber: '22AAAAA0000A1Z5',
    location: 'Near Palace Nirma, Veraval',
  },
  {
    name: 'Ravi electronics store',
    gstNumber: '33BBBBB1111B2Y6',
    location: 'Main Market, Rajkot',
  },
  {
    name: 'Patel gadget hub',
    gstNumber: '44CCCCC2222C3Z7',
    location: 'MG Road, Ahmedabad',
  },
  {
    name: 'Tanna electronics shop',
    gstNumber: '22AAAAA0000A1Z5',
    location: 'Near Palace Nirma, Veraval',
  },
  {
    name: 'Ravi electronics store',
    gstNumber: '33BBBBB1111B2Y6',
    location: 'Main Market, Rajkot',
  },
  {
    name: 'Patel gadget hub',
    gstNumber: '44CCCCC2222C3Z7',
    location: 'MG Road, Ahmedabad',
  },
 
];

export const ShopList = () => {

  const {token} = useSelector((state) => state.auth);
  const [showAll, setShowAll] = useState(false);

  const[shopkeepers, setShopkeepers] = useState([]);

  const getshopData = async() => {
    const result = await getShopbyCity(token);
    setShopkeepers(result);
  }

  getshopData();

  console.log("ARRAY..................",shopkeepers);
  
  return (
    <div className='w-10/12 flex flex-col justify-center space-y-8 p-4 mx-auto'>

        <div className='flex flex-col text-[#174B3A] '>
            <p className='text-4xl mt-14 leading-10 font-semibold text-[#174B3A]'>Here are nearby Shopkeepers !</p>
            <p className='mt-2 text-[15px] text-[#174B3A] '>We have customized the list of shopkeepers based on your location!</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           
        {shopkeepers.slice(0, showAll ? shopkeepers.length : 6).map((shop, index) => (
          <ShopCard key={index} shop={shop} />
        ))}
        </div>


        <button
          onClick={() => setShowAll(!showAll)}
          className='bg-[#F19A3E] w-[100px] text-[16px] text-white py-2 px-4 rounded'
        >
          {showAll ? 'See Less' : 'See All'}
        </button>

        <hr className='border-[1px] border-black/50'/>

        <div className='flex mt-2 justify-center items-center '>
            {/* Card */}
            <div className='bg-[#2EC4B6EB]  shadow-[0_3px_0_0] shadow-[#2EC4B6EB]/50  max-w-[90%] w-[700px] flex flex-col px-10 py-8 rounded-md'>

              <p className='text-white text-[24px]'>Start selling <span className='text-[#174B3A]'>E-waste</span> Now!</p>
              <p className='text-[16px] mt-1'>Add your product, fill basics details and you are all set to sell your product!</p>

              <div className='bg-[#F19A3E] text-white rounded-md gap-2 flex justify-center items-center w-[200px] px-[8px] py-[8px] mt-4'>
              <IoAdd  className=" text-[20px]" />
              <p className='text-[16px]' >Add Product Now</p>
              </div>

             </div> 

             {/* Images */}
             <img src={ShopListImage} className='w-[100px] sm:hidden md:hidden lg:block xs:hidden'></img>

        </div>

    </div>
  )
}
