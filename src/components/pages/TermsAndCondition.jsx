import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaArrowUp, FaShieldAlt, FaCreditCard, FaUserSlash, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleToggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Intersection Observer to track visible sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => 
              prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]
            );
          } else {
            setVisibleSections((prev) => prev.filter((id) => id !== entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const sections = [
    { 
      id: "welcome", 
      title: "Welcome to E-Waste Trade Hub",
      icon: <FaShieldAlt className="text-[#4caf50]" />,
      content: "Thank you for choosing our platform. By accessing or using our services, you agree to these terms and conditions. Our platform aims to create a sustainable ecosystem for electronic waste management."
    },
    { 
      id: "privacy-policy", 
      title: "Privacy Policy",
      icon: <FaShieldAlt className="text-[#4caf50]" />,
      content: "We respect your privacy and are committed to protecting your personal information. This section outlines how we handle data collection, use, and security. We implement industry-standard security measures to protect your information and never share your data with third parties without your consent."
    },
    { 
      id: "billing", 
      title: "Subscription & Billing",
      icon: <FaCreditCard className="text-[#4caf50]" />,
      content: "Users are billed on a monthly basis. Refunds are processed according to our cancellation policy. We offer various subscription tiers to meet different needs, and all billing information is securely processed through our payment partners."
    },
    { 
      id: "account-termination", 
      title: "Account Termination",
      icon: <FaUserSlash className="text-[#4caf50]" />,
      content: "We reserve the right to suspend or terminate accounts for violations of our terms or policies. Users may also request account termination at any time through our platform. Upon termination, certain data may be retained in accordance with legal requirements."
    },
    { 
      id: "governing-law", 
      title: "Governing Law",
      icon: <FaBalanceScale className="text-[#4caf50]" />,
      content: "These terms are governed by the laws of the applicable jurisdiction. Any disputes arising from the use of our platform will be resolved according to these laws. Users agree to resolve disputes through arbitration before pursuing legal action."
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#174B3A] to-[#277158] text-white py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              {t("Terms & Conditions")}
            </h1>
            <p className="mt-4 text-lg text-green-100">
              {t("Effective Date")}: <span className="font-semibold">1st Jan 2024</span>
            </p>
            <div className="mt-6 inline-flex items-center justify-center space-x-2 text-sm text-green-100">
              <span>{t("Last Updated")}:</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">May 15, 2024</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar/Table of Contents */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-[#174B3A] text-white">
                <h2 className="text-lg font-bold">{t("Table of Contents")}</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`flex items-center py-2 px-3 text-sm rounded-lg transition-colors ${
                          visibleSections.includes(section.id)
                            ? "bg-[#174B3A]/10 text-[#174B3A] font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#174B3A]/10 text-[#174B3A] mr-3 text-xs font-bold">
                          {index + 1}
                        </span>
                        {t(section.title)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-2 px-4 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  ← {t("Go Back")}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <motion.section 
                id="welcome" 
                className="mb-8 pb-8 border-b border-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#174B3A]/10 flex items-center justify-center text-[#174B3A]">
                    <FaShieldAlt />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("Welcome to E-Waste Trade Hub")}
                  </h2>
                </div>
                <div className="prose prose-green max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {t("Thank you for choosing our platform")}. {t("By accessing or using our services, you agree to these terms and conditions. Our platform aims to create a sustainable ecosystem for electronic waste management.")}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {t("These terms constitute a legally binding agreement between you and E-Waste Trade Hub regarding your use of our platform and services.")}
                  </p>
                </div>
              </motion.section>

              {/* Expandable Sections */}
              {sections.slice(1).map((section, index) => (
                <motion.section 
                  key={section.id}
                  id={section.id} 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleToggleSection(section.id)}
                    className={`w-full flex items-center justify-between text-left p-4 rounded-lg transition-all duration-200 ${
                      activeSection === section.id 
                        ? "bg-[#174B3A] text-white" 
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activeSection === section.id 
                          ? "bg-white/20 text-white" 
                          : "bg-[#174B3A]/10 text-[#174B3A]"
                      }`}>
                        {section.icon}
                      </div>
                      <span className="text-xl font-semibold">{index + 1}. {t(section.title)}</span>
                    </div>
                    {activeSection === section.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {activeSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {t(section.content)}
                      </p>
                    </motion.div>
                  )}
                </motion.section>
              ))}

              {/* Contact Box */}
              <div className="mt-10 bg-[#174B3A]/5 rounded-xl p-6 border border-[#174B3A]/20">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#174B3A]/10 flex items-center justify-center text-[#174B3A]">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-gray-900">{t("Have Questions About Our Terms?")}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {t("Contact our support team at")} <a href="mailto:support@ewastetradehub.com" className="text-[#174B3A] font-medium hover:underline">support@ewastetradehub.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>{t("These terms and conditions were last updated on")} May 15, 2024.</p>
              <p className="mt-1">© {new Date().getFullYear()} E-Waste Trade Hub. {t("All rights reserved")}.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#174B3A] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#0d2c21] transition-all duration-300 flex items-center justify-center"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default TermsAndConditions;