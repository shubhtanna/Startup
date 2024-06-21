import React, { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
// import { TermsCondition } from './TermsCondition';
import { addPrice, addProduct } from '../../../Services/Operation/productAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export const ProductDescModal = ({ showProductDetails, setShowProductDetails, product }) => {

  console.log("product",product)

  const [isDisabled, setisDisabled] = useState(true);
  const [price, setPrice] = useState('');
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth);


  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice)
    setisDisabled(newPrice.trim() === '');
  };

  const closeModal = () => {
    setShowProductDetails(null)
  };

  const handleImageClick = (url) => {
    window.open(url, '_blank');
  };

  // const handlePublish = async (event) => {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   const data = {
  //     ...product,
  //     price
  //   };
  //   console.log("data", data);
  //   await addPrice(data, token);
  // };

  const handlePublish =  (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const data = {
      productId: product._id, // Ensure this is the correct product ID field
      price: price,
    };
  
    console.log("Data to be sent:", data);
  
    addPrice(data, token,navigate);
  }
  

  return (
    <div className='flex fixed inset-0 z-[1000] flex-col items-center justify-center bg-[black] bg-opacity-10 backdrop-blur-sm overflow-auto'>

      <div className='w-[500px] bg-[white] rounded-md  shadow-lg p-8'>

        {/* Product Description Heading*/}
        <div className="flex items-center justify-between p-2 ">

          <p className=" font-roboto font-medium text-2xl">
            Product Description
          </p>

          {/* closeButton */}
          <FaWindowClose size={24} onClick={closeModal}  />

        </div>

        <hr className=" border-t-2 border-black mt-1" />

        <div className='flex flex-col space-y-6 p-4'>

          {/* ProductName - Category */}
          <div className='flex gap-10'>

            {/* Product Name */}
            <div className='flex flex-col '>
              <p className='text-[18px]'>Product Name</p>
              <p className='text-[#000000]/60'>{product.productName}</p>
            </div>

            {/* Category */}
            <div className='flex flex-col'>
              <p className='text-[18px]'>Category</p>
              <p className='text-[#000000]/60'>{product.category.categoryName}</p>
            </div>


          </div>

          {/* Modal Number - Brand */}
          <div className='flex gap-10'>

            {/* Modal Number */}
            <div className='flex flex-col'>
              <p className='text-[18px]'>Modal Number</p>
              <p className='text-[#000000]/60'>{product.modelName}</p>
            </div>

            {/* Brand  */}
            <div className='flex flex-col'>
              <p className='text-[18px]'>Brand </p>
              <p className='text-[#000000]/60'>{product.brandName.name}</p>
            </div>


          </div>

          {/* Product Description */}
          <div className='flex flex-col'>
            <p className='text-[18px]'>Product Description</p>
            <p className='text-[#000000]/60'>{
              product.productDescription
            }
            </p>
          </div>

          <div>
            <p>Product Image</p>
            <img src={product.productImage} width={50}
              className="hover:scale-110 transition-transform cursor-pointer"
              onClick={() => handleImageClick(product.productImage)}
              alt="Product"
            />
          </div>

        </div>

        <hr className=" border-t-2 border-black mt-1" />

        {/* Add your price */}
        <div className='flex flex-col mt-1 p-3'>

          <p className='text-[#174B3A] text-2xl'>Add your price !</p>

          <p className='mt-1'>Add estimated for the interested product.</p>

          <div className=" flex gap-5 mt-3 mb-1 group">

            <form onSubmit={handlePublish}>
              <input
                type="text"
                placeholder=' Add price'
                onChange={handlePriceChange}
                value={price}
                className={`shadow-lg rounded-md p-2 outline-none `}
              />


              <button
                type="submit"
                className={`bg-[#F19A3E] font-roboto font-medium text-[20px] px-8 py-2 text-white rounded-2xl ${isDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }`}
                disabled={isDisabled}>
                Publish
              </button>
            </form>


          </div>

        </div>

      </div>

    </div>
  )
}
