// import React, { useEffect, useState } from 'react'
// import { ProductDescModal } from './ProductDescModal';
// import { useLocation } from 'react-router-dom'
// import { Link } from 'react-router-dom';
// import { FaRegHeart } from "react-icons/fa";
// import { getAllProductsByCity } from '../../../Services/Operation/vendorAPI';
// import { useSelector } from 'react-redux';
// import OtherShopkeeperModal from '../../Shopkeeper/OtherShopkeeperModal';
// import { useTranslation } from 'react-i18next';

// // const products=[
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// //   {
// //       product_name:"Redmi Note 9 pro",
// //       category:"SmartPhone",
// //       brand:"xiomi",
// //   },
// // ]


// export const AllProduct = () => {
//     const [showProductDetails, setShowProductDetails] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const location = useLocation();
//     const [otherProducts, setOtherProducts] = useState(null);

//     const [products, setProducts] = useState([]);

//     const { token } = useSelector((state) => state.auth);

//     const {t} = useTranslation();

//     useEffect(() => {
//         const getProducts = async () => {
//             const res = await getAllProductsByCity(token);
//             setProducts(res);
//             // console.log("Products",res);
//         }
//         getProducts();
//     }, [])

//     const handleViewMore = (product) => {
//         setSelectedProduct(product);
//         setShowProductDetails(true);
//     };

//     const [showModal, setShowModal] = useState(false);
//     const handleModal = (product) => {
//         console.log("Product lighter : ", product);
//         setOtherProducts(product);
//         setShowModal(true);
//     }

//     console.log(products);
//     return (
//         <>

//             <div className='bg-[#DCE2DE] '>

//                 <div><p className='text-xl font-medium ml-5 p-6'>
//                    {t("Home / dashboard /")} <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></p>
//                 </div>

//                 <div className='p-2 space-y-7'>

//                     <div>
//                         <p className='ml-[70px] text-[2.25rem] font-semibold'>{t("Check out the list of products!")}</p>
//                         <p className=' ml-[70px]  text-[1rem] text-[#174B3A]'>{t("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium")}</p>
//                     </div>

//                     <div className='flex flex-col'>

//                         <div className='overflow-y-auto '>
//                             {
//                                 products.map((product, index) => (

//                                     // <div key={index} className='w-[800px] bg-white rounded-md mx-auto  mb-5 mt-5 px-6 py-8'>
//                                     //     <div className='flex items-center justify-center font-roboto gap-x-[120px]'>

//                                     //         <div className='flex flex-col space-y-2'>
//                                     //             <p className=' text-[#00000085] text-[1rem]'>Product name</p>
//                                     //             <p>{product.productName}</p>
//                                     //         </div>

//                                     //         <div className=' flex flex-col space-y-2'>
//                                     //             <p className=' text-[#00000085] text-[1rem]'>Category</p>
//                                     //             <p>{product.category.categoryName}</p>
//                                     //         </div>

//                                     //         <div className='flex flex-col space-y-2'>
//                                     //             <p className=' text-[#00000085] text-[1rem]'>Brand</p>
//                                     //             <p>{product.brandName.name}</p>
//                                     //         </div>

//                                     //         <div className='underline text-[#093FFE] text-base font-medium'>
//                                     //             <Link onClick={() => handleViewMore(product)} >View More</Link>
//                                     //         </div>

//                                     //     </div>

//                                     //     <div className='flex gap-4 justify-center font-roboto mt-4'>

//                                     //         <FaRegHeart className=' text-red-600 ml-8' />
//                                     //         <p className='-mt-1 text-[#174B3A]'>{product.estimatedPrice.length} shopkeepers have shown interest in this product
//                                     //             <span className='underline ml-2 text-[#F19A3E]'><button onClick={()=>handleModal(product)}>view list</button></span></p>
//                                     //     </div>
//                                     // </div>

                  
//                                     <div className='flex space-x-8 bg-[white] rounded-md mb-4 w-[800px] relative' >

//                                         <img src={product.productImage} width="300px" className='p-4'>
//                                         </img>

//                                         <div className='flex flex-col gap-[10px]'>

//                                                 <div className='flex space-x-3 mt-6'>
//                                                     <p>Product Name:</p>
//                                                     <p>{product.productName}</p>
//                                                 </div>

//                                                 <div className='flex space-x-3'>
//                                                     <p>Product Category:</p>
//                                                     <p>{product.category.categoryName}</p>
//                                                 </div>

//                                                 <div className='flex space-x-3'>
//                                                     <p>Product Brand:</p>
//                                                     <p>{product.brandName.name}</p>
//                                                 </div>

//                                                 <div className='flex space-x-4  mt-2'>

//                                                     <button
//                                                         className='bg-[#F19A3E] py-2 px-3 text-white rounded-md '
//                                                         onClick={() => handleViewMore(product)}
//                                                     >View More</button>

//                                                     <button
//                                                         className='border border-[#292D2A] px-3  py-2 text-[#292D2A] rounded-md '
//                                                         onClick={() => handleModal(product)}>Shopkeeper's List</button>

//                                                 </div>
//                                         </div>

//                                         <div className='bg-[#292D2A] text-white absolute top-0 right-4 width-[500px] flex flex-col justify-center items-center p-4 rounded-bl-lg rounded-br-lg'>
//                                                 <p className='text-[20px] '>{product.estimatedPrice.length}</p>
//                                                 <p className='text-[12px] italic'>Interested</p>

//                                             <div className='flex flex-col space-y-2'>
//                                                 <p className=' text-[#00000085] text-[1rem]'>{t("Product name")}</p>
//                                                 <p>{product.productName}</p>
//                                             </div>

//                                             <div className=' flex flex-col space-y-2'>
//                                                 <p className=' text-[#00000085] text-[1rem]'>{t("Category")}</p>
//                                                 <p>{product.category.categoryName}</p>
//                                             </div>

//                                             <div className='flex flex-col space-y-2'>
//                                                 <p className=' text-[#00000085] text-[1rem]'>{t("Brand")}</p>
//                                                 <p>{product.brandName.name}</p>
//                                             </div>

//                                             <div className='underline text-[#093FFE] text-base font-medium'>
//                                                 <Link onClick={() => handleViewMore(product)} >{t("View More")}</Link>
//                                             </div>

//                                         </div>
//                                         <div className='flex gap-4 justify-center font-roboto mt-4'>

//                                             <FaRegHeart className=' text-red-600 ml-8' />
//                                             <p className='-mt-1 text-[#174B3A]'>{product.estimatedPrice.length} {t("shopkeepers have shown interest in this product")}
//                                                 <span className='underline ml-2 text-[#F19A3E]'><button onClick={()=>handleModal(product)}>{t("view list")}</button></span></p>
//                                         </div>

//                                     </div>
//                                 ))
//                             }
//                         </div>

//                     </div>

//                 </div>

//             </div>

//             {
//                 showProductDetails && <ProductDescModal showProductDetails={showProductDetails} setShowProductDetails={setShowProductDetails} product={selectedProduct} />
//             }

//             {

//                 showModal && <OtherShopkeeperModal setShowModal={setShowModal} product={selectedProduct} otherProducts={otherProducts} />

//             }

//         </>

//     )
// }



import React, { useEffect, useState } from 'react';
import { ProductDescModal } from './ProductDescModal';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { getAllProductsByCity } from '../../../Services/Operation/vendorAPI';
import { useSelector } from 'react-redux';
import OtherShopkeeperModal from '../../Shopkeeper/OtherShopkeeperModal';
import { useTranslation } from 'react-i18next';

export const AllProduct = () => {
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const location = useLocation();
    const [otherProducts, setOtherProducts] = useState(null);
    const [products, setProducts] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    useEffect(() => {
        const getProducts = async () => {
            const res = await getAllProductsByCity(token);
            setProducts(res);
        };
        getProducts();
    }, []);

    const handleViewMore = (product) => {
        setSelectedProduct(product);
        setShowProductDetails(true);
    };

    const [showModal, setShowModal] = useState(false);
    const handleModal = (product) => {
        setOtherProducts(product);
        setShowModal(true);
    };

    return (
        <>
            <div className='bg-[#DCE2DE] p-4'>
                <div>
                    <p className='text-xl font-medium ml-5 p-6'>
                        {t("Home / dashboard /")} <span className='text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span>
                    </p>
                </div>
                <div className='p-2 space-y-7'>
                    <div className='text-center md:text-left md:ml-[70px]'>
                        <p className='text-[1.75rem] md:text-[2.25rem] font-semibold'>{t("Check out the list of products!")}</p>
                        <p className='text-[0.875rem] md:text-[1rem] text-[#174B3A]'>{t("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium")}</p>
                    </div>
                    <div className='flex flex-col items-center space-y-5 md:space-y-7'>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                            {products.map((product, index) => (
                                <div key={index} className='bg-white rounded-md w-full max-w-[350px] p-4 md:p-6 flex flex-col items-center space-y-4'>
                                    <img src={product.productImage} alt='Product' className='w-full h-48 object-cover rounded-md' />
                                    <div className='text-center'>
                                        <p className='text-sm md:text-base font-semibold'>{t("Product Name")}: {product.productName}</p>
                                        <p className='text-sm md:text-base'>{t("Category")}: {product.category.categoryName}</p>
                                        <p className='text-sm md:text-base'>{t("Brand")}: {product.brandName.name}</p>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <button
                                            className='bg-[#F19A3E] py-2 px-3 text-white rounded-md text-sm md:text-base'
                                            onClick={() => handleViewMore(product)}
                                        >
                                            {t("View More")}
                                        </button>
                                        <button
                                            className='border border-[#292D2A] py-2 px-3 text-[#292D2A] rounded-md text-sm md:text-base'
                                            onClick={() => handleModal(product)}
                                        >
                                            {t("Shopkeeper's List")}
                                        </button>
                                    </div>
                                    <div className='text-center text-[#174B3A] text-xs md:text-sm'>
                                        <FaRegHeart className='inline text-red-600' /> {product.estimatedPrice.length} {t("shopkeepers have shown interest in this product")}
                                        <span className='underline text-[#F19A3E] ml-2 cursor-pointer' onClick={() => handleModal(product)}>
                                            {t("view list")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showProductDetails && (
                <ProductDescModal
                    showProductDetails={showProductDetails}
                    setShowProductDetails={setShowProductDetails}
                    product={selectedProduct}
                />
            )}
            {showModal && (
                <OtherShopkeeperModal
                    setShowModal={setShowModal}
                    product={selectedProduct}
                    otherProducts={otherProducts}
                />
            )}
        </>
    );
};
