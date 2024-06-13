import React from 'react'
import SIGNUP from '../../assets/signup_image.png'
import SIgnup_Form from '../Auth/SIgnup_Form'

const Signup = () => {
    return (
        <div className='bg-[#DCE2DE] pt-20 pb-20'>

            <div className='w-10/12 flex justify-between items-center bg-[#fff] mx-auto rounded-3xl p-10'>

                <div className=' flex flex-col justify-center items-center'>

                    <h2 className=' font-roboto font-semibold text-4xl text-[#174B3A] max-w-[250px] text-center mb-10'>New User? Join Us Now!</h2>

                    <SIgnup_Form/>
                </div>

                <div>

                    <img src={SIGNUP} />
                </div>
            </div>
        </div>
    )
}

export default Signup
