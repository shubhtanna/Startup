import React, { useEffect, useState } from 'react'
import { RenderSteps } from '../Add Product/RenderSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllDetailsOfProduct } from '../../../Services/Operation/productAPI';
import { setEditProduct, setProduct, resetProductState } from '../../../Slices/productSlice';
import { useTranslation } from 'react-i18next';

const EditProduct = () => {
  
  const {t} = useTranslation();
  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const populateProductDetails = async () => {
      setLoading(true);
      dispatch(setProduct(null));
      console.log("Product id :", productId);
      const result = await getAllDetailsOfProduct(token, productId);

      if (result) {

        dispatch(setEditProduct(true))
        dispatch(setProduct(result))
        console.log("Product in EditProduct  ", product);
      }
      setLoading(false);
    }
    populateProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  return (
    <div >
      <div className=' flex flex-col '>
        <div className="flex  items-center justify-between p-2 ">
          <p className=" font-roboto font-medium text-2xl">
           {t("Edit Product details")}
          </p>
        </div>
        <hr className=" border-t-2 border-black mt-1" />
        <div className="mx-auto max-w-[600px]">
          {product ? (
            <RenderSteps />
          ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
              {t("Product not found")}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditProduct