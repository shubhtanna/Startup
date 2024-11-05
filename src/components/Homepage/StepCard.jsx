import React from 'react';
import { Link } from 'react-router-dom';

const StepCard = ({ cardData }) => {
    return (
        <div className='bg-[#174B3A] h-[400px] w-[290px] sm:w-[340px] md:w-[360px] lg:w-[380px] xl:w-[400px] text-white py-8 px-4 mb-4 rounded-lg ml-4 flex-shrink-0'>
            <div className='flex flex-col gap-3 font-semibold px-3'>
                <div className='bg-[#F19A3E] aspect-square w-[60px] sm:w-[70px] md:w-[80px] h-[60px] sm:h-[70px] md:h-[80px] rounded-full p-2 border-2 border-dashed border-white flex items-center justify-center'>
                    <p className='text-4xl md:text-5xl text-center text-white'>{cardData.id}</p>
                </div>
                <p className='text-2xl sm:text-3xl lg:text-4xl mt-2'>{cardData.heading}</p>
                <p className='text-[16px] sm:text-lg lg:text-xl'>{cardData.description}</p>
                {cardData.btn1 && (
                    <button className='border-2 border-[#28735A] p-2 rounded-md mt-6'>
                        <Link to="/signup" className='text-sm sm:text-base lg:text-lg'>{cardData.btn1}</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default StepCard;
