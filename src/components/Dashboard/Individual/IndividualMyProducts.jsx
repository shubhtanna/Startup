import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { deleteProduct, getAllProductsOfUser } from "../../../Services/Operation/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from '../../common/ConfirmationModal';
import { setProduct } from "../../../Slices/productSlice";


const IndividualMyProducts = () => {

    const{token} = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {product} = useSelector((state)=>state.product);

    const [confirmationModal,setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);

    const [myProducts, setMyProducts] = useState([]);


    useEffect(() => {
        const getMyProductData = async() => {
            const res = await getAllProductsOfUser(token);
            setMyProducts(res);
        }
    
        getMyProductData();
    },[])

    console.log("DATA..........",myProducts);
    
    const handleProductDelete = async(productId)=>{
        setLoading(true);
        await deleteProduct({productId: productId},token);

        const result = await getAllProductsOfUser(token);
        if(result){
           setMyProducts(result);
          
        }
         setConfirmationModal(null)
        setLoading(false);
    }
   
   
    return (
        <div className="bg-[#DCE2DE]">

            
    <div className=' text-xl font-medium font-roboto'>Home / dashboard / <span className=' text-[#F19A3E]'>{location.pathname.split("/").slice(-1)}</span></div>

            <div className='p-8 space-y-7 font-roboto'>
                <p className=' text-[2.25rem]'>Your Saved Products are here !</p>
            </div>


            <div className="flex mt-14 flex-col justify-center  items-center gap-8">
                    {myProducts.map((item, index) => (
                    <div key={index} className="flex shadow-lg rounded-md bg-[white] w-[900px] p-8 ">
                
                        <div className="flex flex-row space-x-32">

                            <img src={item.productImage} className="w-[200px] h-[150px]" alt={`item._id`} />

                            <div className="flex text-xl flex-col font-roboto gap-y-2">
                            <p className=" text-loginitem"><span className="text-loginitem font-semibold">Product Name:</span> {item.productName}</p>
                            <p className=" text-loginitem"><span className="text-loginitem font-semibold">Category:</span> {item.category.categoryName}</p>
                            <p className=" text-loginitem">
                               <span className="text-loginitem font-semibold">Brand:</span> {item.brandName.name}
                            </p>
                            <p className=" text-loginitem">
                                <span className="text-loginitem font-semibold">Model Number:</span> {item.modelName}
                            </p>
                           </div>

                           <div className="flex items-start gap-x-8">
                            <button
                             onClick={() => {
                                navigate(`/dashboard/edit-product/${item._id}`)
                              }}
                            >
                                <CiEdit className="text-2xl"/>
                            </button>
                            <button
                            onClick={()=>{
                                setConfirmationModal({
                                    text1:'Do you want to delete product ?',
                                    text2:'This will delete all product details',
                                    btn1Text:!loading ? "Delete" : "Loading...  ",
                                    btn2Text: "Cancel",
                                    btn1Handler: !loading ? 
                                    () => handleProductDelete(item._id) 
                                    : () => {},

                                    btn2Handler: !loading ? 
                                    () => setConfirmationModal(null) 
                                    : () => {}
                                })
                            }}
                            >
                                <RiDeleteBin6Line className="text-2xl" />
                            </button>
                          </div>

                        </div>

                    </div>
                ))}
            </div>
             {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }

        </div>
    );
};



export default IndividualMyProducts
 