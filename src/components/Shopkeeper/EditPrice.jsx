import React, { useState, useEffect } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setProduct, setEditProduct, } from '../../Slices/productSlice'
import { getAllDetailsOfProduct } from '../../Services/Operation/productAPI'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'
import { editPriceOfProduct } from '../../Services/Operation/vendorAPI'

import toast from 'react-hot-toast'


const EditPrice = ({ setShowModal, prodId, onUpdateProduct }) => {

  const { product } = useSelector((state) => state.product);
  const { editProduct } = useSelector((state) => state.product);

  const { token } = useSelector((state) => state.auth);


  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
  }

  const {
    register, handleSubmit, setValue, getValues, formState: { errors },
  } = useForm()


  useEffect(() => {
    const populateProductDetails = async () => {
      setLoading(true);

      const result = await getAllDetailsOfProduct(token, prodId);

      if (result) {

        dispatch(setEditProduct(true))

        dispatch(setProduct(result))
        try {


          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.id; // Assuming the user ID is stored in the 'id' field

          const userPrice = result.estimatedPrice.find(price => price.userId === userId)?.price;

          if (userPrice) {

            setValue('price', userPrice);
          }
        }
        catch (error) {
          console.error('Error decoding token:', error)
        }
      }
      setLoading(false);
    }
    populateProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.populateProductDetailsrice !== product.estimatedPrice[0].price
    ) {

      return true;
    }
    return false;
  }

  const onSubmit = async (data) => {

    if (editProduct) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        if (currentValues.estimatedPrice !== product.estimatedPrice[0].price) {
          formData.append("price", data.price);
        }
        data.productId = prodId;


        setLoading(true);
        const updatedProduct = await editPriceOfProduct(token, data);
        console.log("Updated price result", updatedProduct);

        if (updatedProduct) {
          dispatch(setProduct(updatedProduct))
          onUpdateProduct(updatedProduct);

          setShowModal(false);
        }
      }
    } else {

      toast.error("No changes made to the form");
    }
    return;
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-[white] bg-opacity-10 backdrop-blur-sm">
      <div className='bg-white flex flex-col p-8 w-[600px] gap-4 rounded-md'>
        <div className="flex items-center justify-between  ">
          <p className=" font-roboto font-medium text-2xl">
            Edit Product details
          </p>
          <FaWindowClose onClick={handleClose} size={24} />
        </div>
        <hr className=" border-t-2 border-black" />
        <p className='text-[#00000083] text-[18px]'>You can edit your estimated price for the product.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-4 flex flex-col'>
            <label className="mt-3 text-[1rem] font-medium font-roboto ">
              Edit Estimated Price:
            </label>
            <input type="text"
              {...register("price", { required: true })}
              className={`shadow-xl mt-2 rounded-md p-2 outline-none `} />
            {errors.estimatedPrice && (
              <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
                Estimated Price is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`bg-[#F19A3E] mt-10 font-roboto font-medium text-[20px] px-8 py-2 text-white rounded-2xl
                  }`}
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditPrice