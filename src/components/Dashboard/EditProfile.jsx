import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../Services/Operation/settingsAPI';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { CiLock, CiUnlock } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {

    const { t } = useTranslation();
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submitProfileform = async (data) => {
        try {
            dispatch(updateProfile(token, data))
        }
        catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <div className='mt-8'>
            <form onSubmit={handleSubmit(submitProfileform)} className='flex flex-col gap-8'>
                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='firstName' className='font-roboto text-[16px] opacity-60'>
                            {t("First Name")}
                        </label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder={t('Enter first name')}
                            className='input_feild'
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName} />
                        {
                            errors.firstName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {t("Please enter your first name.")}
                                </span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='lastName' className='font-roboto text-[16px] opacity-60'>
                            {t("Last Name")}
                        </label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder={t('Enter last name')}
                            className='input_feild'
                            {...register("lastName", { required: true })}
                            defaultValue={user?.lastName} />
                        {
                            errors.lastName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {t("Please enter your last name.")}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label className='font-roboto text-[16px] opacity-60' htmlFor='dateOfBirth'>
                            {t("Date of Birth")}
                        </label>
                        <input
                            type='date'
                            name='dateOfBirth'
                            id='dateOfBirth'
                            className='input_feild'
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date Of Birth."
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of birth cannot be in the future"
                                }
                            })}
                            defaultValue={user?.profile?.dateOfBirth}
                        />
                        {
                            errors.dateOfBirth && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {errors.dateOfBirth.message}
                                </span>
                            )
                        }
                    </div>
                    <div className='flex flex-col lg:w-[48%]'>
                        <label className='font-roboto text-[16px] opacity-60' htmlFor='gender'>
                            {t("Gender")}
                        </label>
                        <select
                            type='text'
                            name='gender'
                            id='gender'
                            className='input_feild'
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}>
                            {
                                genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })
                            }
                        </select>{
                            errors.gender && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {t("Please enter your gender")}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-5 lg:flex-row'>
                    <div className='flex flex-col justify-center gap-2 lg:w-[48%]'>
                        <label htmlFor='lastName' className='font-roboto text-[16px] opacity-60'>
                            {t("Contact Number")}
                        </label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder={t('Enter contact number')}
                            className='input_feild'
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number."
                                },
                                maxLength: {
                                    value: 12, message: "Invalid Contact Number"
                                },
                                minLength: {
                                    value: 10, message: "Invalid Contact Number"
                                },
                            }
                            )}
                            defaultValue={user?.profile?.contactNumber}
                        />
                        {
                            errors.lastName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {t("Please enter your Contact number.")}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
                    <button
                        className="bg-[#F19A3E] text-base sm:text-lg lg:text-xl font-medium font-roboto px-4 sm:px-6 lg:px-8 py-2 text-white rounded-xl sm:rounded-2xl"
                        onClick={() => navigate("/dashboard/my-profile")}
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        type="submit"
                        className="bg-[#F19A3E] text-base sm:text-lg lg:text-xl font-medium font-roboto px-4 sm:px-6 lg:px-8 py-2 text-white rounded-xl sm:rounded-2xl"
                    >
                        {t("Save & Update")}
                    </button>
                </div>
            </form>
            <div className=" mt-12">
                <p className=" font-roboto font-medium text-2xl">
                    {t("Edit your password")}
                </p>
                <hr className=" border-t-2 border-black mt-2" />
            </div>
            <form className='mt-10 '>
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-6 items-center w-full">
                    {/* Current Password */}
                    <div className="relative w-full sm:w-auto">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder={t("Current Password")}
                            className="input_feild w-full sm:w-64 lg:w-80"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[9px] z-[10] cursor-pointer opacity-50"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible size={24} />
                            ) : (
                                <AiOutlineEye size={24} />
                            )}
                        </span>
                    </div>

                    {/* Change Password */}
                    <div className="relative w-full sm:w-auto">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder={t("Change Password")}
                            className="input_feild w-full sm:w-64 lg:w-80"
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[9px] z-[10] cursor-pointer opacity-50"
                        >
                            {showConfirmPassword ? (
                                <CiLock size={24} />
                            ) : (
                                <CiUnlock size={24} />
                            )}
                        </span>
                    </div>
                </div>
                <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
                    <button
                        className="bg-[#F19A3E] text-base sm:text-lg lg:text-xl font-medium font-roboto px-4 sm:px-6 lg:px-8 py-2 text-white rounded-md"
                    // onClick={() => navigate("/dashboard/my-profile")}
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        type="submit"
                        className="bg-[#F19A3E] text-base sm:text-lg lg:text-xl font-medium font-roboto px-4 sm:px-6 lg:px-8 py-2 text-white rounded-md"
                    >
                        {t("Save & Update")}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
