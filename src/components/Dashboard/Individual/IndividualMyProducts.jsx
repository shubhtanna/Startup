import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { deleteProduct, getAllProductsOfUser } from "../../../Services/Operation/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from '../../common/ConfirmationModal';
import { setProduct } from "../../../Slices/productSlice";
import { useTranslation } from "react-i18next";

const IndividualMyProducts = () => {
    const { t } = useTranslation();
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);

    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        const getMyProductData = async () => {
            const res = await getAllProductsOfUser(token);
            setMyProducts(res);
        };
        getMyProductData();
    }, []);

    const handleProductDelete = async (productId) => {
        setLoading(true);
        await deleteProduct({ productId }, token);

        const result = await getAllProductsOfUser(token);
        if (result) {
            setMyProducts(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div className="bg-[#DCE2DE] p-4 md:p-8">
            <div className="text-lg md:text-xl font-medium font-roboto">
                {t("Home / dashboard /")}{" "}
                <span className="text-[#F19A3E]">{location.pathname.split("/").slice(-1)}</span>
            </div>

            <div className="my-4 md:my-8 space-y-4 md:space-y-7 font-roboto">
                <p className="text-2xl md:text-[2.25rem]">{t("Your Saved Products are here!")}</p>
            </div>

            <div className="flex flex-col items-center gap-6 md:gap-8 mt-6 md:mt-14">
                {myProducts.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row shadow-lg rounded-md bg-white w-full md:w-[900px] p-4 md:p-8 space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row md:space-x-8 items-center md:items-start">
                            <img
                                src={item.productImage}
                                className="w-full md:w-[200px] h-auto md:h-[150px] object-cover"
                                alt={`${item._id}`}
                            />

                            <div className="text-lg md:text-xl flex flex-col font-roboto gap-y-1 md:gap-y-2 mt-4 md:mt-0">
                                <p>
                                    <span className="font-semibold">{t("Product Name:")}</span> {item.productName}
                                </p>
                                <p>
                                    <span className="font-semibold">{t("Category:")}</span> {item.category.categoryName}
                                </p>
                                <p>
                                    <span className="font-semibold">{t("Brand:")}</span> {item.brandName.name}
                                </p>
                                <p>
                                    <span className="font-semibold">{t("Model Number:")}</span> {item.modelName}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row justify-center md:justify-end items-center gap-x-4 mt-4 md:mt-0">
                            <button
                                onClick={() => navigate(`/dashboard/edit-product/${item._id}`)}
                                className="text-xl md:text-2xl"
                            >
                                <CiEdit />
                            </button>
                            <button
                                onClick={() =>
                                    setConfirmationModal({
                                        text1: 'Do you want to delete this product?',
                                        text2: 'This will delete all product details.',
                                        btn1Text: !loading ? "Delete" : "Loading...",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading ? () => handleProductDelete(item._id) : () => { },
                                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => { },
                                    })
                                }
                                className="text-xl md:text-2xl"
                            >
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default IndividualMyProducts;
