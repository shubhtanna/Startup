import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { InterestedProductOfIndividual } from '../../Services/Operation/productAPI';
import { useSelector } from 'react-redux';
import ShopDetailModel from './ShopDetailModel';

const IntrestedProduct = [
    {
        product_name:"abc",
        model_number:"AJIX3421",
        pricerange:"5000-7000",
        like:<FaRegHeart className=' text-red-600'/>,
        like_1:<FaHeart className='text-red-600 '/>,
        time:"1k"
    },
    {
        product_name:"abc",
        model_number:"AJIX3421",
        pricerange:"5000-7000",
        like:<FaRegHeart className=' text-red-600'/>,
        like_1:<FaHeart className='text-red-600 '/>,
        time:"1k"
    },
    {
        product_name:"abc",
        model_number:"AJIX3421",
        pricerange:"5000-7000",
        like:<FaRegHeart className=' text-red-600'/>,
        like_1:<FaHeart className='text-red-600 '/>,
        time:"1k"
    },
    {
        product_name:"abc",
        model_number:"AJIX3421",
        pricerange:"5000-7000",
        like:<FaRegHeart className=' text-red-600'/>,
        like_1:<FaHeart className='text-red-600 '/>,
        time:"1k"
    },
    {
        product_name:"abc",
        model_number:"AJIX3421",
        pricerange:"5000-7000",
        like:<FaRegHeart className=' text-red-600'/>,
        like_1:<FaHeart className='text-red-600 '/>,
        time:"1k"
    },
   
  ]

const InterestedProduct = () => {
    const location = useLocation();
    const [isLike,setIslike] = useState(false);
    const [showShopkeeperDetails,setShowShopkeeperDetails] = useState(false);

    const [products, setProducts] = useState([]);
    const [prices, setPrices] = useState({ max: null, min: null });

    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const getProducts = async() => {
            const res = await InterestedProductOfIndividual(token);
            setProducts(res);
        }

        getProducts();
    },[])

    useEffect(() => {
        const getMaxMinPrices = (estimatedPrice) => {
          if (!estimatedPrice || estimatedPrice.length === 0) return { max: null, min: null };
    
          let maxPrice = estimatedPrice[0].price;
          let minPrice = estimatedPrice[0].price;
    
          for (let i = 1; i < estimatedPrice.length; i++) {
            const price = estimatedPrice[i].price;
            if (price > maxPrice) maxPrice = price;
            if (price < minPrice) minPrice = price;
          }
          
          return { max: maxPrice, min: minPrice };
        };
    
        const prices = getMaxMinPrices(products.estimatedPrice);
        setPrices(prices);
        console.log(prices.max)
      }, [products.estimatedPrice]);

    console.log("INTRESTED PRODUCTS>>>>>>>>>",products);
    
    const handleLike = ()=>{
        setIslike(!isLike);
    }

    
  return (
    <div className=' bg-[#DCE2DE] '>

    <div className=' text-xl font-medium font-roboto'>Home / dashboard / <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></div>

    <div className='p-8 space-y-7'>
        <div className=' font-roboto '>
            <p className=' text-[2.25rem]'>See who is interested in your product!</p>
            <p className=' text-[1.25rem] text-[#174B3A]'>Look for the shopkeepers interested on your product and grab best deals!</p>
        </div>

        <div className='flex flex-col '>
            <div  className='overflow-y-auto'>
                {
                    products.map((card,index) => (
                        
                            <div key={index} className=' bg-white rounded-2xl mx-auto max-w-[90%] mb-5 mt-5'>
                            <div className=' flex justify-between font-roboto p-3'>
                                <div className='p-3 space-y-2 ml-10'>
                                    <p className='text-[22px] font-roboto'>{card.productName}</p>
                                    <p className=' font-roboto text-[16px] text-[#00000099]'>Model number: <span>{card.category}</span></p>
                                </div>
                                <div className='p-3 space-y-2 ml-10'>
                                    <p className='text-[22px] font-roboto'>Price range</p>
                                        <p className=' font-roboto text-[16px] text-[#00000099]'>{prices.max}</p>
                                </div>
                                <div className=' text-[#F19A3E] p-3 space-y-3 mr-10'>
                                <p onClick={handleLike} className='flex space-x-2'>
                                    {
                                        !isLike ? <FaRegHeart className=' text-red-600'/> : <FaHeart className='text-red-600 '/>
                                    }
                                    <span className='-mt-1 text-black'>{card.estimatedPrice.length}</span></p>
                                    <Link 
                                    to={`/dashboard/interested-products/${card._id}`}>More details</Link>
                                    
                                </div>
                            </div>
                            </div>

                    
                        
                    ))
                }
                </div>
            </div>

        </div>
        {
        showShopkeeperDetails && <ShopDetailModel showShopkeeperDetails={showShopkeeperDetails} setShowShopkeeperDetails={setShowShopkeeperDetails}/>
    }
        </div>
  )
}

export default InterestedProduct
