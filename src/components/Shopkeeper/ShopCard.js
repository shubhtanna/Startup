import React from 'react'
import { Link } from 'react-router-dom'
import { TiStarFullOutline } from "react-icons/ti";

export const ShopCard = ({shop}) => {
  return (
    <>
     <div>
        <div className='bg-[#292D2A] text-white p-8 rounded-md flex flex-col gap-1 '>
            <p className='text-xl font-semibold'>{shop?.firstName}</p>
            <p className='text-white mt-2 opacity-75 text-[15px]'>GST Number: {shop.gstNumber}</p>
            <p className='text-white opacity-75 text-[15px]'>Location: {shop?.city}</p>
          <div className='flex justify-between items-center  mt-5'>
            {/* Star */}
            <div className='flex items-center' >
            <TiStarFullOutline className='text-[24px] text-[#FFF970]'/>
            <TiStarFullOutline className='text-[24px] text-[#FFF970]'/>
            <TiStarFullOutline className='text-[24px] text-[#FFF970]'/>
            <TiStarFullOutline className='text-[24px] text-[#FFF970]'/>
            <TiStarFullOutline className='text-[24px] text-[#FFF970]'/>

            </div>
           
            {/* Reviews */}
            <Link to="#" className='text-[#F19A3E] text-[18px] underline'>Reviews</Link>
          </div>
        </div>
     </div>
    </>
  )
}
