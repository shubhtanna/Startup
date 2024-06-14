import React, { useState } from 'react'
import { userCard } from '../../Data/HomeSlider';
import StepCard from './StepCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";


const toogles = [
    "Customer",
    "Shopkeeper"
];

const Customize_your_feed = () => {
    const [currentTogle, setCurrentTogle] = useState(toogles[0]);
    const [steps, setSteps] = useState(userCard[0].steps)
    // console.log(steps);

    const setElement = (value) => {
        setCurrentTogle(value);
        const res = userCard.filter((step) => step.type === value);
        setSteps(res[0].steps);
    }


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    }
    return (
        <div className=' bg-[#499F68] bg-opacity-20 py-5 '>



            <div className=' w-10/12 mx-auto'>

                <div>
                    <h1 className=' font-bold text-[44px] text-[#174B3A] font-roboto mb-8'>Customize your feed!</h1>
                </div>


                <div className='flex gap-x-3 justify-center items-center py-3 px-5 bg-[#FEFDED] w-fit rounded-full text-[#174B3A] font-medium text-2xl'>
                    {
                        toogles.map((toogle, index) => (
                            <div key={index} className={`rounded-full px-6 py-1
            ${currentTogle === toogle ? " bg-[#174B3A] font-medium cursor-pointer text-white" : "hover:bg-[#174B3A] transition-all duration-200 cursor-pointer hover:text-white"}`}
                                onClick={() =>
                                    setElement(toogle)
                                }>
                                {toogle}
                            </div>
                        ))
                    }
                </div>


                <div className=' w-11/12 mx-auto my-14'>
                    <Slider {...settings}>
                        {
                            steps.map((ele, i) => (
                                <StepCard key={i} cardData={ele} />
                            ))
                        }
                    </Slider>
                </div>
            </div>

        </div>
    )
}

export default Customize_your_feed
