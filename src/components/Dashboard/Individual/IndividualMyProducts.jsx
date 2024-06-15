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

            
    <div className=' text-xl font-medium font-roboto'>Home / dashboard / <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></div>

            <div className='p-8 space-y-7 font-roboto'>
                <p className=' text-[2.25rem]'>Your Saved Products are here !</p>
            </div>


            <div className="flex mt-14 flex-col justify-center items-center gap-8">
                    {myProducts.map((item, index) => (
                    <div key={index} className="flex shadow-lg rounded-md bg-[white] p-8 ">
                
                        <div className="flex flex-row space-x-36">

                            <img src={item.productImage} className="w-[200px] h-[150px]" alt={`item._id`} />

                            <div className="flex text-xl flex-col font-roboto gap-y-2">
                            <p className="text-loginitem font-semibold">{item.productName}</p>
                            <p className=" text-loginitem">{item.category}</p>
                            <p className=" text-loginitem">
                                {item.brandName}
                            </p>
                            <p className=" text-loginitem">
                                {item.modelName}
                            </p>
                           </div>

                           <div className="flex items-start gap-x-8">
                            <button>
                                <CiEdit className="text-2xl"/>
                            </button>
                            <button>
                                <RiDeleteBin6Line className="text-2xl" />
                            </button>
                          </div>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};



export default IndividualMyProducts
