import React, { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
// import { TermsCondition } from './TermsCondition';
import { addPrice, addProduct } from '../../../Services/Operation/productAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const ProductDescModal = ({ showProductDetails, setShowProductDetails, product }) => {

  console.log("product", product)
  const { t } = useTranslation();

  const [isDisabled, setisDisabled] = useState(true);
  const [price, setPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState(product.productImage);
  const [activeImage, setActiveImage] = useState(true);
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

  const handleImage = (image) => {
    setSelectedImage(image)
    setActiveImage(!activeImage);
  }


  const handlePublish = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const data = {
      productId: product._id, // Ensure this is the correct product ID field
      price: price,
    };

    console.log("Data to be sent:", data);

    addPrice(data, token, navigate);
  }


  return (
    <div className='flex fixed inset-0 z-[1000] flex-col items-center justify-center bg-[black] bg-opacity-10 backdrop-blur-sm overflow-auto'>
      <div className=' bg-[white] rounded-md  shadow-lg p-8'>
        {/* Product Description Heading*/}
        <div className="flex items-center justify-between p-2 ">
          <p className=" font-roboto font-medium text-2xl">
            {t("Product Description")}
          </p>
          {/* closeButton */}
          <FaWindowClose size={24} onClick={closeModal} />
        </div>
        <hr className=" border-t-2 border-black mt-1" />
        <div className='flex space-x-6 py-6 '>
          <div className="flex space-x-2">
            <div className='flex flex-col gap-2'>
              <img src={product.productImage} className={`w-[64px] h-[64px] p-[5px] border 
              ${activeImage === true ? 'border-2 border-[#F19A3E]' : ''
                }
          }}`} onClick={() => handleImage(product.productImage)} />
              <img src={product.invoiceImage} className={` w-[64px] h-[64px] p-[5px] border 
             ${activeImage === true ? '' : 'border-2 border-[#F19A3E]'
                }
          }`} onClick={() => handleImage(product.invoiceImage)} />
            </div>
            <div>
              <img src={selectedImage} className='w-[270px] h-[270px] p-2 border border-[#bdc3c7]' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex space-x-3'>
              <p>Product Name:</p>
              <p>{product.productName}</p>
            </div>

            <div className='flex space-x-3'>
              <p>Product Category:</p>
              <p>{product.category.categoryName}</p>
            </div>

            <div className='flex space-x-3'>
              <p>Product Brands:</p>
              <p>{product.brandName.name}</p>
            </div>

            <div className='flex space-x-3'>
              <p>Product Model:</p>
              <p>{product.modelName}</p>
            </div>

            <div className='flex space-x-3'>
              <p>Product Description:</p>
              <p className='w-[220px]'>{product.productDescription}</p>
            </div>
          </div>
        </div>
        <hr className=" border-t-2 border-black mt-1" />
        {/* Add your price */}
        <div className='flex flex-col mt-1 p-3'>
          <p className='text-[#174B3A] text-2xl'>{t("Add your price !")}</p>
          <p className='mt-1'>{t("Add estimated for the interested product.")}</p>
          <form onSubmit={handlePublish} className="flex space-x-2 mt-3 mb-1 group">
            <input
              type="text"
              placeholder=' Add price'
              onChange={handlePriceChange}
              value={price}
              className={`shadow-lg rounded-md p-2 outline-none `}
            />

            <button
              type="submit"
              className={`bg-[#F19A3E] font-roboto font-medium text-[20px] px-8 py-2 text-white rounded-md ${isDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }`}
              disabled={isDisabled}>
              {t("Publish")}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
