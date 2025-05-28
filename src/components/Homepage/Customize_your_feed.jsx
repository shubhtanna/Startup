import React, { useState, useEffect, useRef } from 'react';
import { userCard } from '../../Data/HomeSlider';
import StepCard from './StepCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineRecycling, MdVerified } from 'react-icons/md';
import { FaUserAlt, FaStore, FaCheckCircle } from 'react-icons/fa';
import { IoShieldCheckmark } from 'react-icons/io5';

const toggleOptions = [
    { id: "Customer", icon: <FaUserAlt className="mr-2" />, color: "from-emerald-600 to-teal-500" },
    { id: "Shopkeeper", icon: <FaStore className="mr-2" />, color: "from-blue-600 to-teal-500" }
];

const Customize_your_feed = () => {
    const [currentToggle, setCurrentToggle] = useState(toggleOptions[0].id);
    const [steps, setSteps] = useState(userCard[0].steps);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const { t } = useTranslation();
    
    // Custom arrows for slider with enhanced styling
    const NextArrow = ({ onClick }) => (
        <button 
            onClick={onClick} 
            className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-emerald-700 transition-all duration-300 hover:scale-110 hover:bg-emerald-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Next slide"
        >
            <MdKeyboardArrowRight size={28} />
        </button>
    );
    
    const PrevArrow = ({ onClick }) => (
        <button 
            onClick={onClick} 
            className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-emerald-700 transition-all duration-300 hover:scale-110 hover:bg-emerald-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Previous slide"
        >
            <MdKeyboardArrowLeft size={28} />
        </button>
    );

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        
        const section = document.getElementById('journey-section');
        if (section) observer.observe(section);
        
        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const setElement = (value) => {
        setCurrentToggle(value);
        const res = userCard.filter((step) => step.type === value);
        setSteps(res[0].steps);
        setCurrentSlide(0);
        
        // Reset slider to first slide
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false, // Disabled autoplay for better UX control
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        pauseOnHover: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 1280,
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
        ],
        dotsClass: "slick-dots custom-dots",
        appendDots: dots => (
            <div className="mt-8">
                <ul className="flex justify-center items-center gap-3"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer border-2 ${i <= currentSlide ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-emerald-300'}`}></div>
        )
    };

    // Calculate active step for timeline
    const activeStep = Math.min(Math.floor(currentSlide / 1) + 1, 3);

    return (
        <section 
            id="journey-section"
            className="bg-gradient-to-b from-slate-50 via-emerald-50 to-emerald-100 py-24 relative overflow-hidden"
        >
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl"></div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute top-20 left-1/4 w-4 h-4 bg-emerald-400/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-40 right-1/4 w-6 h-6 bg-emerald-500/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-emerald-600/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className={`w-11/12 lg:w-10/12 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Enhanced header with premium badge */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm mb-4">
                        <MdOutlineRecycling className="text-emerald-600 mr-1.5" />
                        <span className="text-emerald-800 font-medium text-xs tracking-wider uppercase">
                            {t("Simplified Process")}
                        </span>
                    </div>
                    
                    <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-slate-800 font-roboto mt-4 mb-5 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600">
                            {t("Let's begin the journey")}!
                        </span>
                    </h2>
                    
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 mx-auto rounded-full"></div>
                    
                    <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t("Follow these simple steps to start your e-waste recycling journey with us")}
                    </p>
                </div>

                {/* Enhanced toggle buttons with better visual design */}
                <div className="flex justify-center mb-14">
                    <div className="p-1.5 bg-white shadow-xl rounded-full flex items-center border border-slate-100">
                        {toggleOptions.map((toggle, index) => (
                            <button
                                key={index}
                                className={`relative flex items-center justify-center rounded-full px-6 py-3.5 transition-all duration-300 ${
                                    currentToggle === toggle.id 
                                    ? "text-white z-10" 
                                    : "text-slate-700 hover:bg-slate-50 z-0"
                                }`}
                                onClick={() => setElement(toggle.id)}
                                aria-pressed={currentToggle === toggle.id}
                            >
                                {currentToggle === toggle.id && (
                                    <span className={`absolute inset-0 bg-gradient-to-r ${toggle.color} rounded-full shadow-md`}></span>
                                )}
                                <span className="relative flex items-center font-medium">
                                    {toggle.icon}
                                    <span>{t(toggle.id)}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enhanced slider container with premium frame */}
                <div className="mx-auto my-10 px-12 relative">
                    {/* Premium background frame */}
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl -m-4 shadow-lg"></div>
                    
                    {/* Trust indicators */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full py-1 px-4 flex items-center gap-2 text-sm z-10">
                        <IoShieldCheckmark className="text-emerald-600" />
                        <span className="text-slate-700 font-medium">{t("Trusted Process")}</span>
                    </div>
                    
                    {/* Enhanced slider */}
                    <Slider ref={sliderRef} {...settings} className="journey-slider py-4">
                        {steps.map((ele, i) => (
                            <div key={i} className="px-4 py-4">
                                <div className="transform transition-all duration-500 hover:scale-[1.02] h-full">
                                    <StepCard
                                        cardData={{
                                            ...ele,
                                            heading: t(ele.heading),
                                            description: t(ele.description),
                                            btn1: ele.btn1 ? t(ele.btn1) : ""
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                    
                    {/* Certification badge */}
                    <div className="absolute -bottom-3 right-10 bg-white shadow-md rounded-full py-1 px-3 flex items-center gap-1.5 text-xs z-10">
                        <MdVerified className="text-teal-600" />
                        <span className="text-slate-700">{t("Certified Process")}</span>
                    </div>
                </div>
                
                {/* Premium process timeline */}
                <div className="hidden md:flex justify-between items-center max-w-4xl mx-auto mt-16 px-10 relative">
                    {/* Background line */}
                    <div className="h-1 bg-slate-200 absolute w-3/4 left-1/2 -translate-x-1/2"></div>
                    
                    {/* Active progress line with animation */}
                    <div 
                        className="h-1 bg-gradient-to-r from-emerald-500 to-teal-400 absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
                        style={{ width: `${(activeStep - 1) * 37.5}%` }}
                    ></div>
                    
                    {/* Step indicators */}
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="relative z-10 flex flex-col items-center group">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                                ${step < activeStep 
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200" 
                                    : step === activeStep 
                                        ? "bg-white border-2 border-emerald-500 text-emerald-600 ring-4 ring-emerald-100" 
                                        : "bg-white border-2 border-slate-200 text-slate-400"
                                }`}
                            >
                                {step < activeStep ? (
                                    <FaCheckCircle className="text-white text-lg" />
                                ) : (
                                    step
                                )}
                            </div>
                            <div className={`text-base font-medium mt-3 transition-all duration-300
                                ${step <= activeStep 
                                    ? "text-emerald-700" 
                                    : "text-slate-500"
                                }`}
                            >
                                {t("Step")} {step}
                            </div>
                            
                            {/* Step description tooltip on hover */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-12 bg-white p-2 rounded-lg shadow-lg text-xs text-slate-700 w-48 text-center">
                                {step === 1 && t("Register and categorize your e-waste")}
                                {step === 2 && t("Get offers from verified recyclers")}
                                {step === 3 && t("Complete the transaction safely")}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Mobile timeline (visible only on smaller screens) */}
                <div className="md:hidden flex flex-col gap-4 mt-10 max-w-xs mx-auto">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${activeStep === step ? 'bg-white shadow-md' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${step < activeStep 
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
                                    : step === activeStep 
                                        ? "bg-white border-2 border-emerald-500 text-emerald-600" 
                                        : "bg-white border-2 border-slate-200 text-slate-400"
                                }`}
                            >
                                {step < activeStep ? <FaCheckCircle className="text-white text-sm" /> : step}
                            </div>
                            <div className="text-sm">
                                <div className={`font-medium ${step <= activeStep ? "text-emerald-700" : "text-slate-500"}`}>
                                    {t("Step")} {step}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                    {step === 1 && t("Register your e-waste")}
                                    {step === 2 && t("Get recycler offers")}
                                    {step === 3 && t("Complete transaction")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Trust elements */}
                <div className="mt-20 flex flex-wrap justify-center gap-8">
                    <div className="flex items-center gap-2 text-slate-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                        <IoShieldCheckmark className="text-emerald-600" />
                        <span className="text-sm">{t("Secure Transactions")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                        <MdVerified className="text-teal-600" />
                        <span className="text-sm">{t("Verified Recyclers")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                        <MdOutlineRecycling className="text-emerald-600" />
                        <span className="text-sm">{t("Eco-friendly Process")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customize_your_feed;