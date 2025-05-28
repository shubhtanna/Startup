import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserTag, FaStore, FaRecycle, FaLeaf } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterYourself = () => {
    const { t } = useTranslation();

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            y: -10,
            boxShadow: "0 10px 25px rgba(23, 75, 58, 0.3)",
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            transition: { 
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.95 }
    };

    return (
        <section className="bg-gradient-to-b from-[#EEF2E3] to-[#e6ead6] py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-[#174B3A]/10 text-[#174B3A] rounded-full mb-3">
                        {t("Join Our Ecosystem")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                        {t("Register yourself")}!
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        {t("Choose your role in creating a sustainable future for electronic waste")}
                    </p>
                    
                    {/* Decorative element */}
                    <div className="flex justify-center mt-6">
                        <div className="h-1 w-24 bg-gradient-to-r from-[#174B3A]/20 via-[#174B3A] to-[#174B3A]/20 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {/* Seller Card */}
                    <motion.div 
                        className="relative overflow-hidden bg-gradient-to-br from-[#174B3A] to-[#0d2c21] text-white rounded-xl shadow-xl"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Decorative circles */}
                        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/5"></div>
                        <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/5"></div>
                        
                        <div className="relative z-10 p-8 sm:p-10">
                            <div className="flex items-center justify-center h-16 w-16 bg-white/10 rounded-lg backdrop-blur-sm mb-6 mx-auto">
                                <FaUserTag size={30} className="text-[#FEFDED]" />
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                                {t("Seller")}
                            </h3>
                            <p className="text-[#FEFDED]/70 text-center mb-4 text-sm">
                                {t("as a user")}
                            </p>
                            
                            <div className="my-6 py-4 px-2 border-y border-white/10">
                                <p className="text-base sm:text-lg text-center leading-relaxed">
                                    {t("Join us in re-using e-waste for a greener planet. Sell your electronics hassle-free with competitive pricing.")}
                                </p>
                            </div>
                            
                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3">
                                    <FaRecycle className="text-[#FEFDED] flex-shrink-0" />
                                    <span className="text-sm">{t("Easy listing process")}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaLeaf className="text-[#FEFDED] flex-shrink-0" />
                                    <span className="text-sm">{t("Environmental impact tracking")}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEarthAmericas className="text-[#FEFDED] flex-shrink-0" />
                                    <span className="text-sm">{t("Connect with verified buyers")}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-center">
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Link to="/signup" className="inline-flex items-center justify-center bg-[#FEFDED] text-[#174B3A] font-medium rounded-lg px-8 py-3 shadow-lg shadow-black/10">
                                        {t("Register as Seller")}
                                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Buyer Card */}
                    <motion.div 
                        className="relative overflow-hidden bg-gradient-to-br from-[#174B3A] to-[#0d2c21] text-white rounded-xl shadow-xl"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Decorative circles */}
                        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/5"></div>
                        <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/5"></div>
                        
                        <div className="relative z-10 p-8 sm:p-10">
                            <div className="flex items-center justify-center h-16 w-16 bg-white/10 rounded-lg backdrop-blur-sm mb-6 mx-auto">
                                <FaStore size={30} className="text-[#FEFDED]" />
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                                {t("Buyer")}
                            </h3>
                            <p className="text-[#FEFDED]/70 text-center mb-4 text-sm">
                                {t("as a shopkeeper")}
                            </p>
                            
                            <div className="my-6 py-4 px-2 border-y border-white/10">
                                <p className="text-base sm:text-lg text-center leading-relaxed">
                                    {t("Become a part of our network and access quality e-waste for your business. Enjoy competitive pricing and increased visibility.")}
                                </p>
                            </div>
                            
                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3">
                                    <FaRecycle className="text-[#FEFDED] flex-shrink-0" />
                                    <span className="text-sm">{t("Verified e-waste sources")}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaLeaf className="text-[#FEFDED] flex-shrink-0" />
                                    <span className="text-sm">{t("Bulk purchase options")}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEarthAmericas className="text-[#FEFDED] flex-shrink-0" />
                                    <span className="text-sm">{t("Sustainability certification")}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-center">
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Link to="/signup" className="inline-flex items-center justify-center bg-[#FEFDED] text-[#174B3A] font-medium rounded-lg px-8 py-3 shadow-lg shadow-black/10">
                                        {t("Register as Buyer")}
                                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Additional information */}
                <motion.div 
                    className="mt-12 sm:mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        {t("Already registered?")} <Link to="/login" className="text-[#174B3A] font-medium hover:underline">{t("Sign in")}</Link> {t("to access your account and continue your contribution to e-waste management.")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default RegisterYourself;