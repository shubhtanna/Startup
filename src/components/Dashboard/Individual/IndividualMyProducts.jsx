import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { getAllProductsOfUser } from "../../../Services/Operation/productAPI";
import { useSelector } from "react-redux";

const IndividualMyProducts = () => {

    const{token} = useSelector((state) => state.auth);
    const location = useLocation();

    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        const getMyProductData = async() => {
            const res = await getAllProductsOfUser(token);
            setMyProducts(res);
        }
    
        getMyProductData();
    },[])

    console.log("DATA..........",myProducts);

    return (
        <div className="bg-[#DCE2DE]">

            <div ><p className="ml-[24px] p-8 text-xl font-medium">Home / dashboard / <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></p></div>

            <div><p className="text-center text-2xl mt-10 font-semibold">Your Saved Products are here !</p></div>


            <div className="flex mt-14 flex-col p-10 justify-center items-center gap-8">
                    {myProducts.map((item, index) => (
                    <div key={index} className="flex shadow-lg rounded-md bg-[white] p-2 w-[80%]">
                        <div className="w-[5rem] h-[6rem] border-4">
                            <img src={item.productImage} alt="" />
                        </div>

                        <div className="flex flex-col font-roboto ml-10 ">
                            <p className="text-bleck font-semibold">{item.productName}</p>
                            <p className=" text-loginitem">{item.modelName}</p>
                            <p className=" text-loginitem">
                                Estimated price: {item.estimatedPrice.price}
                            </p>
                        </div>

                        <div className="flex w-[60%] -mt-[3rem] justify-end space-x-6 text-2xl">
                            <button>
                                <CiEdit />
                            </button>
                            <button>
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};



export default IndividualMyProducts
