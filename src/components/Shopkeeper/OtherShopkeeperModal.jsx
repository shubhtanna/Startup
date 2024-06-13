import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const OtherShopkeeperModal = ({setShowModal,product}) => {
    const location = useLocation();
    console.log(product);
    const shopkeeper=[
        {
            sr_no:  "1",
            first_name:"abc",
            otherShopkeeperPrice:"4545",
            my_price:"4000"
        },
        {
            sr_no:  "1",
            first_name:"abc",
            otherShopkeeperPrice:"4545",
            my_price:"4000"
        },
        {
            sr_no:  "1",
            first_name:"abc",
            otherShopkeeperPrice:"4545",
            my_price:"4000"
        },
        {
            sr_no:  "1",
            first_name:"abc",
            otherShopkeeperPrice:"4545",
            my_price:"4000"
        },
        
        {
            sr_no:  "1",
            first_name:"abc",
            otherShopkeeperPrice:"4545",
            my_price:"4000"
        },
        
        {
            sr_no:  "1",
            first_name:"abc",
            otherShopkeeperPrice:"4545",
            my_price:"4000"
        },
        
        
    ]

    const closeModal = ()=>{
      setShowModal(null);
    }
  return (
    <div className='bg-[black] bg-opacity-10 backdrop-blur-sm fixed inset-0 z-[1000]'>

          <div class="w-[100vw] h-[100vh] flex  flex-col justify-center items-center ">
          <div className=' bg-white p-16 rounded-3xl' >
    <div className=' flex items-center gap-[15rem]'>
                <p className=' text-[2.25rem] text-[#174B3A] font-semibold'>Other Shopkeeper</p>
                <div className=''>
      <IoClose onClick={closeModal}/>
    </div>
            </div>
      <div className='overflow-y-auto '>
        <table
          class=" text-left text-sm w-[600px]  h-[400px] bg-[#DCE2DE] font-light text-surface dark:text-black">
          <thead
            class="border-b border-neutral-200 font-medium dark:border-white/10 ">
            <tr>
              <th scope="col" class="px-8 py-4">Sr no</th>
              <th scope="col" class="px-8 py-4">First name</th>
              <th scope="col" class="px-8 py-4">Other Shopkeeper price</th>
              <th scope="col" class="px-8 py-4">My Price</th>
            </tr>
          </thead>
          
          <tbody>
        
          {
                shopkeeper.map((table,index)=>(
                <tr key={index} class="border-b border-neutral-200 dark:border-white/10">
              <td class="whitespace-nowrap px-4 py-2 font-medium">{index + 1}</td>
              <td class="whitespace-nowrap px-4 py-2">{table.first_name}</td>
              <td class="whitespace-nowrap px-4 py-2">{table.otherShopkeeperPrice}</td>
              <td class="whitespace-nowrap px-4 py-2">{table.my_price}</td>
            </tr>
                ))
          }
        
          </tbody>
        </table>
      </div>
    </div>
          </div>
    

  </div>




        
  )
}

export default OtherShopkeeperModal