import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaRecycle, FaChartLine } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

const WhyChooseUs = () => {
    const { t } = useTranslation();
    
    return (
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
            <div className="container mx-auto px-4">
                {/* Section header with subtle animation */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-roboto">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
                            {t("Why choose Us")}?
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                    <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">
                        {t("Join thousands of environmentally conscious users making a difference through responsible e-waste management")}
                    </p>
                </div>
                
                {/* Feature cards with enhanced styling */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Card 1 - Eco-Friendly */}
                    <div className="relative group overflow-hidden rounded-xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-emerald-600/40 opacity-75 group-hover:opacity-90 transition-all duration-300"></div>
                        <div className="relative p-8 h-full flex flex-col">
                            <div className="mb-6">
                                <div className="bg-white/10 p-4 rounded-lg inline-block backdrop-blur-sm">
                                    <FaLeaf className="text-emerald-400 text-4xl" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-poppins">{t("Eco-Friendly Solutions")}</h3>
                            <p className="text-slate-200 font-inter flex-grow">
                                {t("We prioritize responsible reuse and disposal, helping you contribute to environmental sustainability while reducing your carbon footprint.")}
                            </p>
                            <div className="mt-6 flex items-center">
                                <div className="h-px bg-emerald-400/30 flex-grow"></div>
                                <div className="bg-emerald-500/20 rounded-full p-2 backdrop-blur-sm transform group-hover:translate-x-2 transition-transform duration-300">
                                    <FaRecycle className="text-emerald-300 text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Best Prices */}
                    <div className="relative group overflow-hidden rounded-xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-600/40 opacity-75 group-hover:opacity-90 transition-all duration-300"></div>
                        <div className="relative p-8 h-full flex flex-col">
                            <div className="mb-6">
                                <div className="bg-white/10 p-4 rounded-lg inline-block backdrop-blur-sm">
                                    <IoCheckmarkCircle className="text-blue-400 text-4xl" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-poppins">{t("Best Prices")}</h3>
                            <p className="text-slate-200 font-inter flex-grow">
                                {t("Our platform connects you with multiple shopkeepers, ensuring you get the best price estimates for your e-waste through our competitive marketplace.")}
                            </p>
                            <div className="mt-6 flex items-center">
                                <div className="h-px bg-blue-400/30 flex-grow"></div>
                                <div className="bg-blue-500/20 rounded-full p-2 backdrop-blur-sm transform group-hover:translate-x-2 transition-transform duration-300">
                                    <FaChartLine className="text-blue-300 text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Rewards */}
                    <div className="relative group overflow-hidden rounded-xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-purple-600/40 opacity-75 group-hover:opacity-90 transition-all duration-300"></div>
                        <div className="relative p-8 h-full flex flex-col">
                            <div className="mb-6">
                                <div className="bg-white/10 p-4 rounded-lg inline-block backdrop-blur-sm">
                                    <FaUserTag className="text-purple-400 text-4xl" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-poppins">{t("Rewards and Benefits")}</h3>
                            <p className="text-slate-200 font-inter flex-grow">
                                {t("Earn reward points for every successful deal, unlocking incredible offers and incentives for continued use of our sustainable platform.")}
                            </p>
                            <div className="mt-6 flex items-center">
                                <div className="h-px bg-purple-400/30 flex-grow"></div>
                                <div className="bg-purple-500/20 rounded-full p-2 backdrop-blur-sm transform group-hover:translate-x-2 transition-transform duration-300">
                                    <FaUserTag className="text-purple-300 text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to action */}
                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1">
                        {t("Join Our E-Waste Movement")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;