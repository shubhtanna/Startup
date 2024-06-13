import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoAdd } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { updateVendorDetais } from '../../Services/Operation/settingsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ShopDetails = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const [selectImages, setSelectImages] = useState([]);
    const [imgNames, setImgNames] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleImages = (e) => {

        if (e.target.files) {

            const fileArray = Array.from(e.target.files);

            setImgNames((prevImgNames) => [
                ...prevImgNames,
                ...fileArray.map(file => file.name)
            ]);

            setSelectImages((prevImages) => [
                ...prevImages,
                ...fileArray
            ]);


            console.log(fileArray);
        }

    }

    const submitVendorForm = async(data) => {
        try {

            dispatch(updateVendorDetais(token,data))


        } catch (error) {

            console.log(error);
        }
    }

    // useEffect(() => {
    //     const updateDetails = async() => {
    //         const res = updateVendorDetais(token,)
    //     }
    // })


    return (
        <div>
            {/* Edit shop info */}
            <form onSubmit={handleSubmit(submitVendorForm)}>
                <div className="mt-6">
                    <p className=" font-roboto font-medium text-2xl">
                        Edit Shop information
                    </p>

                    <hr className=" border-t-2 border-black mt-2" />
                </div>

                <div className='flex mt-10 gap-2 flex-col'>

                    {/* Shop Name */}
                    <div className='flex flex-col gap-2 '>
                        <label htmlFor='shopName' className='font-roboto text-[16px] opacity-60'>
                            Shop Name
                        </label>
                        <input
                            type='text'
                            name='shopName'
                            id='shopName'
                            placeholder='Enter Shop name'
                            className='input_feild'
                            defaultValue={user.vendorDetails.shopName}
                            {...register("shopName", { required: true })}
                        />
                        {
                            errors.shopName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter your shop name.
                                </span>
                            )
                        }
                    </div>

                    {/* gstNumber */}
                    <div className='flex flex-col gap-2 '>
                        <label htmlFor='gstNumber' className='font-roboto text-[16px] opacity-60'>
                            GST Number
                        </label>
                        <input
                            type='text'
                            name='gstNumber'
                            id='gstNumber'
                            placeholder='Enter GST Number'
                            className='input_feild'
                            defaultValue={user?.vendorDetails?.gstNumber}
                            {...register("gstNumber", { required: true })}
                        />
                        {
                            errors.gstNumber && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter your GST Number
                                </span>
                            )
                        }
                    </div>

                    {/* Shop Address */}
                    <div className='flex flex-col gap-2 '>
                        <label htmlFor='address' className='font-roboto text-[16px] opacity-60'>
                            Shop Address
                        </label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            placeholder='Enter Shop Address'
                            className='input_feild'
                            defaultValue={user?.address}
                            {...register("address", { required: true })}
                        />
                        {
                            errors.address && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter your Address
                                </span>
                            )
                        }
                    </div>
                </div>

                {/* Edit Gst Invoice info */}
                <div className="mt-6">
                    <p className=" font-roboto font-medium text-2xl">
                        Edit GST invoice information
                    </p>

                    <hr className=" border-t-2 border-black mt-2" />
                </div>

                <div className='flex flex-col space-y-2'>

                    <div className='flex p-3 mt-6  w-full rounded-md items-center justify-between shadow-lg'>
                        <p className="text-[16px] opacity-60">Current GST Invoice</p>
                        <div className='flex gap-5 justify-between'>
                            <p>invoice.png</p>
                            <RiDeleteBin5Line className="text-[red]" size={25} />
                        </div>
                    </div>

                    <label htmlFor="files" name="files">

                        <input id="files" name="files" className='hidden' type="file"
                        defaultValue={user?.vendorDetails?.gstInvoice}
                        multiple onChange={handleImages} />

                        <div className='flex p-3 w-full rounded-md items-center justify-between shadow-lg'>
                            <p className="text-[16px] opacity-60">Update GST Invoice</p>
                            <IoAdd className=" text-[30px]" />

                        </div>

                    </label>

                </div>

                <div className='mt-8 flex justify-between'>
                    <button className='bg-[#F19A3E] text-[18px] font-medium font-roboto px-8 py-3 text-white rounded-md'
                    // onClick={() => navigate("/dashboard/my-profile")}
                    >Cancel</button>
                    <button type='submit' className='bg-[#F19A3E] text-[18px] font-medium font-roboto px-8 py-3 text-white rounded-md'>Save & Update</button>
                </div>

            </form>
        </div>
    )
}

