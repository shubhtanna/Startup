import React, { useState, useEffect } from 'react';
import JOIN_US from "../../assets/join_us_image.png";
import { useDispatch } from 'react-redux';
import { contactUs } from '../../Services/Operation/userAPI';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';
import { motion } from 'framer-motion';

const JoinUs = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        message: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { email, message } = formData;
    const [joinUsImage, setJoinUsImage] = useState('');

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageRef = ref(storage, 'gs://t-music-be993.appspot.com/E-Waste/join_us_image.png');
                const url = await getDownloadURL(imageRef);
                setJoinUsImage(url);
            } catch (error) {
                console.error('Error fetching image from Firebase Storage:', error);
            }
        };
        fetchImage();
    }, []);

    function handleOnSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        dispatch(contactUs(email, message))
            .then(() => {
                setFormSubmitted(true);
                setFormData({
                    email: "",
                    message: ""
                });
                setTimeout(() => setFormSubmitted(false), 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full mb-3">
                            {t("Connect With Us")}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            {t("Join the E-Waste Revolution")}
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600">
                            {t("Have questions about e-waste trading or recycling? We're here to help you make sustainable choices.")}
                        </p>
                    </motion.div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-green-900 opacity-10 z-10"></div>
                            <div className="h-full">
                                <img
                                    src={joinUsImage || JOIN_US}
                                    alt="E-Waste Recycling"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent opacity-70 h-1/3 z-20"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
                                <h3 className="text-white text-2xl font-bold">{t("Sustainable Future")}</h3>
                                <p className="text-green-50 mt-2">{t("Every device recycled makes a difference")}</p>
                            </div>
                        </div>
                        
                        {/* Form Section */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12">
                            <form onSubmit={handleOnSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("Email Address")}
                                    </label>
                                    <input
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="you@example.com"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("Your Message")}
                                    </label>
                                    <textarea
                                        id="message"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                                        rows="5"
                                        name="message"
                                        placeholder={t("Tell us about your e-waste questions or concerns...")}
                                        value={message}
                                        onChange={handleOnChange}
                                        required
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {t("Sending...")}
                                            </>
                                        ) : t("Send Message")}
                                    </button>
                                </div>
                                
                                {formSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-50 border border-green-200 rounded-lg"
                                    >
                                        <p className="text-green-800 text-center font-medium">
                                            {t("Thank you! Your message has been sent successfully.")}
                                        </p>
                                    </motion.div>
                                )}
                                
                                <div className="pt-4 text-center text-sm text-gray-500">
                                    <p>{t("We typically respond within 24 hours")}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
                    <div className="p-4">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{t("Secure & Confidential")}</h3>
                        <p className="mt-2 text-sm text-gray-500">{t("Your information is always protected")}</p>
                    </div>
                    <div className="p-4">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{t("Quick Response")}</h3>
                        <p className="mt-2 text-sm text-gray-500">{t("Our team responds within 24 hours")}</p>
                    </div>
                    <div className="p-4">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{t("Expert Advice")}</h3>
                        <p className="mt-2 text-sm text-gray-500">{t("Professional e-waste trading guidance")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinUs;