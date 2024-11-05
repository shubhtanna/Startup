import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deletePriceOfProduct, getAllInterestedProducts } from '../../Services/Operation/vendorAPI';
import { useSelector } from 'react-redux';
import EditPrice from './EditPrice';
import { setEditProduct } from '../../Slices/productSlice';
import ConfirmationModal from '../common/ConfirmationModal';

export const EditInterestedProduct = () => {
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [prodId, setProdId] = useState();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ; (async () => {
            const result = await getAllInterestedProducts(token);
            if (result) {
                console.log("all interested product", result);
                setProducts(result);
                //   setPrice(result.estimatedPrice.price)
            }
        })()
    }, [token])

    const handleEdit = (productId) => {
        setEditProduct(true);
        setProdId(productId);
        setShowModal(true);
    }

    const handleUpdateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map(product =>
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );
    }

    const handlePriceDelete = async (productId) => {
        setLoading(true);

        await deletePriceOfProduct(token, { productId: productId });

        const result = await getAllInterestedProducts(token);
        if (result) {
            setProducts(result);

        }
        setConfirmationModal(null)
        setLoading(false);
    }


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

                <div className='mt-6 flex flex-col space-y-4 justify-center items-center'>{
                    products.map((product, index) => (
                        <div key={index} className='flex flex-row shadow-lg rounded-md bg-white gap-[50px] justify-between w-[80%] px-8 py-10'>
                            <div className='flex flex-col'>
                                <p className='text-[#00000083] text-[18px]'><span className="text-loginitem font-semibold">Product Name: </span>{product.productName}</p>
                                <p className='text-[#00000083] text-[18px]'><span className="text-loginitem font-semibold">Category: </span>{product.category.categoryName}</p>
                                <p className='text-[#00000083] text-[18px]'><span className="text-loginitem font-semibold">Brand: </span>{product.brandName.name}</p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-[#00000083] text-[18px] font-semibold'>Your Estimated price</p>
                                <p>{product.estimatedPrice[0].price}</p>
                            </div>

                            <div className='flex gap-4'>
                                <button onClick={() => handleEdit(product._id)}>
                                    <CiEdit className='text-[24px]' />
                                </button>
                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: 'Do you want to delete price ?',
                                            text2: 'This will remove your product from interested products',
                                            btn1Text: !loading ? "Delete" : "Loading...  ",
                                            btn2Text: "Cancel",
                                            btn1Handler: !loading ?
                                                () => handlePriceDelete(product._id)
                                                : () => { },

                                            btn2Handler: !loading ?
                                                () => setConfirmationModal(null)
                                                : () => { }
                                        })
                                    }}
                                >

                                    <RiDeleteBin6Line
                                        className='text-[red] text-[24px]' />
                                </button>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            {
                showModal && <EditPrice setShowModal={setShowModal} prodId={prodId} onUpdateProduct={handleUpdateProduct} />
            }
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}
