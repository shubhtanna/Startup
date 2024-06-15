import React from 'react'
import { Link } from 'react-router-dom'

const StepCard = ({ cardData }) => {
    return (
        <div className=' bg-[#174B3A] h-[400px] w-[290px] text-white py-10 px-3 mb-2 rounded-lg'>
            {
                <div className='flex flex-col gap-3 font-semibold px-3'>
                    <div className='bg-[#F19A3E] aspect-square w-[80px] h-[80px] rounded-full p-2 border-2 border-dashed border-white'>
                        <p className='text-5xl p-1 text-center text-white'>{cardData.id}</p>
                    </div>

                    <p className='text-3xl mt-2'>{cardData.heading}</p>
                    <p className='text-[18px]'>{cardData.description}</p>
                   <div>
                    {
                        cardData.btn1 !== "" ? (<button className='border-2 border-[#28735A] p-2 rounded-md mt-6'>
                           <Link to="/signup">{cardData.btn1}</Link> 
                        </button>) :(<></>)
                    }
                   
                    </div>
                    
                   
                   
                </div>
            }
        </div>
    )
}

export default StepCard
