import React, { useState } from 'react'
import JOIN_US from "../../assets/join_us_image.png"
import { useDispatch } from 'react-redux'
import { contactUs } from '../../Services/Operation/userAPI'

const JoinUs = () => {

    const dispatch = useDispatch()
    const [formData,setFormData] = useState({
        email: "",message: "",
    })

    const {email,message} = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(contactUs(email,message))

        setFormData({
            email:"",message:""
        })
    }


    return (
        <div className='lg:w-4/5 mx-auto'>
        <form onSubmit={handleOnSubmit}>
            <div className='flex justify-between items-center gap-8'>
                {/* box-1 */}
                <div className=' text-center '>
                    <div className='p-1 text-section-rgba'>
                        <p className='p-1 text-4xl font-bold'>Feel free to ask any doubts!</p>
                        <div className='flex flex-col text-lg p-2 text-section-rgba text-[#28735A]'>
                            <p>Please ask questions that help us provide clear and </p>
                            <p>precise solutions tailored to your needs.</p>
                        </div>
                    </div>
                    <div>
                        <input className=' bg-input-rgba' type="email" name="email" value={email} placeholder='Email' onChange={handleOnChange} />
                    </div>
                    <div class="mt-2">
                        <textarea class="py-3 px-4 block w-full border-transparent rounded-lg text-sm  disabled:opacity-50 disabled:pointer-events-none dark:border-transparent bg-input-rgba" rows="4" name='message' placeholder="Message" value={message} onChange={handleOnChange}></textarea>
                    </div>
                    <div>
                        <button type='submit' className=' mt-6 bg-register-rgba m-auto p-4 rounded-md tracking-widest w-[40%] transition-all duration-200 hover:scale-105 text-white '>Submit</button>
                    </div>
                </div>
                {/* box-2 */}
                <div>
                    <img src={JOIN_US} alt="" />
                </div>
            </div>
            </form>
        </div>
    )
}

export default JoinUs
