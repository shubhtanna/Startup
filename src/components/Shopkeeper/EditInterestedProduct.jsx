import React from 'react';
import { useLocation } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const product = [
    {   productName : "Redmi Pro",
        category : "Laptop",
        brand : "Mi",
        estimatedPrice : "100"
    },
    {   productName : "Redmi Pro",
        category : "Laptop",
        brand : "Mi",
        estimatedPrice : "100"
    },
    {   productName : "Redmi Pro",
        category : "Laptop",
        brand : "Mi",
        estimatedPrice : "100"
    },
    {   productName : "Redmi Pro",
        category : "Laptop",
        brand : "Mi",
        estimatedPrice : "100"
    }
  ]

export const EditInterestedProduct = () => {
    const location = useLocation();
    return (
        <div>
            <div className='bg-[#DCE2DE]'>

                <div>
                    <p className='text-xl font-medium ml-5 p-6'>
                        Home / dashboard / <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span>
                    </p>
                </div>

                <div>
                    <p className='ml-[70px] text-[2.25rem] font-semibold'>Check out the list of products!</p>
                    <p className=' ml-[70px]  text-[1rem] text-[#174B3A]'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>
                </div>
               

               <div className='mt-6 flex flex-col space-y-4 justify-center items-center'>
                {
                    product.map((item,index)=>(

                        <div key={index} className='flex flex-row shadow-lg rounded-md bg-white gap-[50px] justify-between w-[80%] px-8 py-10'>

                            <div className='flex flex-col'>
                  
                            <p className='text-[#00000083] text-[18px]'>{item.productName}</p>
                            <p className='text-[#00000060]'>{item.category}</p>
                            <p className='text-[#00000060]'>{item.brand}</p>
                            </div>

                            <div className='flex flex-col'>
                            <p className='text-[#00000083] text-[18px] font-semibold'>Your Estimated price</p>
                            <p>{item.estimatedPrice}</p>
                            </div>

                            <div className='flex gap-4'>
                            <CiEdit  className='text-[24px]'/>
                            <RiDeleteBin6Line  className='text-[red] text-[24px]'/>
                            </div>
                        </div>

                        ))
                }
                </div>
        

            </div>
        </div>
    )
}
