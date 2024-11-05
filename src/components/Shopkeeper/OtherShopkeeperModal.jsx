import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { allothershopkeeperprice } from '../../Services/Operation/vendorAPI';
import { useSelector } from 'react-redux';

const OtherShopkeeperModal = ({ setShowModal, otherProducts }) => {
  const location = useLocation();
  console.log("shabbbuuuu", otherProducts);
  const { token } = useSelector((state) => state.auth);
  const [shopkeepers, setShopkeepers] = useState([]);
  const [myPrice, setMyPrice] = useState([])

  useEffect(() => {
    ; (async () => {
      const result = await allothershopkeeperprice(token, otherProducts._id);
      if (result) {
        console.log("Result in other shopkeeper", result);
        setShopkeepers(result.otherPrices);
        console.log("shop", shopkeepers)
        setMyPrice(result.myPrice)
        console.log("price", myPrice)
      }
    })()
  }, [token, otherProducts])

  const closeModal = () => {
    setShowModal(null);
  }

  return (
    <div className='bg-[black] bg-opacity-10 backdrop-blur-sm fixed inset-0 z-[1000]'>
      <div className="w-[100vw] h-[100vh] flex  flex-col justify-center items-center ">
        <div className=' bg-white p-16 rounded-3xl' >
          <div className=' flex items-center gap-[15rem]'>
            <p className=' text-[2.25rem] text-[#174B3A] font-semibold'>Other Shopkeeper</p>
            <div className=''>
              <IoClose onClick={closeModal} />
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
                  shopkeepers.map((shopkeeper, index) => (
                    <tr key={index} class="border-b border-neutral-200 dark:border-white/10">
                      <td class="whitespace-nowrap px-4 py-2 font-medium">{index + 1}</td>
                      <td class="whitespace-nowrap px-4 py-2">{shopkeeper.firstName}</td>
                      <td class="whitespace-nowrap px-4 py-2">{shopkeeper.price}</td>
                      <td class="whitespace-nowrap px-4 py-2">{myPrice}</td>
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