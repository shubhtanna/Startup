import React from 'react'

const StepCard = ({ cardData }) => {
    return (
        <div className=' bg-[#174B3A] text-white py-10 px-5 mb-5 h-[300px]'>
            {
                <div className='flex flex-col gap-3 font-semibold text-2xl'>
                    <div>{cardData.heading}</div>
                    <div>{cardData.description}</div>
                    <div>{cardData.btn1}</div>
                    <div>{cardData.btn2}</div>
                </div>  
            }
        </div>
    )
}

export default StepCard
