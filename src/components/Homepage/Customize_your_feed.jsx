import React, { useState } from 'react';
import { userCard } from '../../Data/HomeSlider';  // Named import, not default
import StepCard from './StepCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';

const toogles = ["Customer", "Shopkeeper"];
const Customize_your_feed = () => {
    const [currentTogle, setCurrentTogle] = useState(toogles[0]);
    const [steps, setSteps] = useState(userCard[0].steps);

    const { t } = useTranslation();  // Use the translation hook here
    const setElement = (value) => {
        setCurrentTogle(value);
        const res = userCard.filter((step) => step.type === value);
        setSteps(res[0].steps);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,               // Enable autoplay
        autoplaySpeed: 1000,          // Set autoplay to 1 second (1000 ms)
        arrows: false,                // Hide arrows
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <>
            <div className='bg-[#499F68] bg-opacity-20 py-5'>
                <div className='w-11/12 lg:w-10/12 mx-auto'>
                    <div>
                        <h1 className='font-bold text-3xl md:text-4xl lg:text-[44px] text-[#174B3A] font-roboto mb-8 text-center'>
                            {t("Let's begin the journey")}!
                        </h1>
                    </div>
                    {/* Responsive Toggle Buttons */}
                    <div className='flex flex-wrap gap-x-3 justify-center items-center py-3 px-5 bg-[#FEFDED] w-fit mx-auto rounded-full text-[#174B3A] font-medium text-lg sm:text-2xl'>
                        {
                            toogles.map((toogle, index) => (
                                <div key={index} className={`rounded-full px-4 sm:px-6 py-1
                                    ${currentTogle === toogle ? "bg-[#174B3A] font-medium cursor-pointer text-white" : "hover:bg-[#174B3A] transition-all duration-200 cursor-pointer hover:text-white"}`}
                                    onClick={() => setElement(toogle)}>
                                    {t(toogle)}
                                </div>
                            ))
                        }
                    </div>
                    {/* Slider Container */}
                    <div className='mx-auto my-14'>
                        <Slider {...settings}>
                            {
                                steps.map((ele, i) => (
                                    <StepCard
                                        key={i}
                                        cardData={{
                                            ...ele,
                                            heading: t(ele.heading),
                                            description: t(ele.description),
                                            btn1: ele.btn1 ? t(ele.btn1) : ""
                                        }}
                                    />
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Customize_your_feed;
