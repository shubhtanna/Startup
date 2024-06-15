import React,{useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllInterestedProducts } from '../../Services/Operation/vendorAPI';
import { useSelector } from 'react-redux';

// const product = [
//     {   productName : "Redmi Pro",
//         category : "Laptop",
//         brand : "Mi",
//         estimatedPrice : "100"
//     },
//     {   productName : "Redmi Pro",
//         category : "Laptop",
//         brand : "Mi",
//         estimatedPrice : "100"
//     },
//     {   productName : "Redmi Pro",
//         category : "Laptop",
//         brand : "Mi",
//         estimatedPrice : "100"
//     },
//     {   productName : "Redmi Pro",
//         category : "Laptop",
//         brand : "Mi",
//         estimatedPrice : "100"
//     }
//   ]

export const EditInterestedProduct = () => {
    const location = useLocation();
    const {token} = useSelector((state)=>state.auth);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      ;(async() => {
        const result = await getAllInterestedProducts(token);
        if(result){
          console.log("all interested product",result);
          setProducts(result);
        //   setPrice(result.estimatedPrice.price)
        }
      }) ()
    },[token])
    console.log("product",products)
    
    
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
                    products.map((product,index)=>(

                        <div key={index} className='flex flex-row shadow-lg rounded-md bg-white gap-[50px] justify-between w-[80%] px-8 py-10'>

                            <div className='flex flex-col'>
                  
                            <p className='text-[#00000083] text-[18px]'>{product.productName}</p>
                            <p className='text-[#00000060]'>{product.category.categoryName}</p>
                            <p className='text-[#00000060]'>{product.brandName.name}</p>
                            </div>

                            <div className='flex flex-col'>
                            <p className='text-[#00000083] text-[18px] font-semibold'>Your Estimated price</p>
                            <p>{product.estimatedPrice[0].price}</p>
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
