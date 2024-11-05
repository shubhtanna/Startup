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
