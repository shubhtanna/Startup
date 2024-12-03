import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleToggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md">
            {t("Terms & Conditions")}
          </h1>
          <p className="mt-3 text-gray-400 text-lg">
            {t("Effective Date")}: <span className="font-semibold">1st Jan 2024</span>
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="bg-gray-800 rounded-lg shadow-md p-6 space-y-3">
          <h2 className="text-2xl font-bold text-gray-300 mb-3">{t("Table of Contents")}</h2>
          <ul className="space-y-4 text-lg">
            <li>
              <a
                href="#welcome"
                className="text-secondary font-medium hover:underline transition duration-300"
              >
                {t("Welcome to E-Waste Trade Hub")}
              </a>
            </li>
            <li>
              <a
                href="#privacy-policy"
                className="text-secondary font-medium hover:underline transition duration-300"
              >
                {t("Privacy Policy")}
              </a>
            </li>
            <li>
              <a
                href="#billing"
                className="text-secondary font-medium hover:underline transition duration-300"
              >
                {t("Subscription & Billing")}
              </a>
            </li>
            <li>
              <a
                href="#account-termination"
                className="text-secondary font-medium hover:underline transition duration-300"
              >
                {t("Account Termination")}
              </a>
            </li>
            <li>
              <a
                href="#governing-law"
                className="text-secondary font-medium hover:underline transition duration-300"
              >
                {t("Governing Law")}
              </a>
            </li>
          </ul>
        </nav>

        {/* Sections */}
        <section id="welcome" className="bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
            {t("Welcome to E-Waste Trade Hub")}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {t("Thank you for choosing our platform")}.{t("By accessing or using our services")}, {t("you agree to these terms and conditions")}.
          </p>
        </section>

        {/* Expandable Sections */}
        <section id="privacy-policy" className="space-y-4">
          <button
            onClick={() => handleToggleSection("privacy-policy")}
            className="w-full text-left text-xl font-semibold bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:bg-gray-700 transition-all duration-300"
          >
            1. {t("Privacy Policy")}
          </button>
          {activeSection === "privacy-policy" && (
            <p className="mt-2 bg-gray-700 rounded-lg p-4 shadow-inner text-gray-300 leading-relaxed">
              {t("We respect your privacy and are committed to protecting your personal information")}. {t("This section outlines how we handle data collection")}, {t("use")}, {t("and security")}.
            </p>
          )}
        </section>

        <section id="billing" className="space-y-4">
          <button
            onClick={() => handleToggleSection("billing")}
            className="w-full text-left text-xl font-semibold bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:bg-gray-700 transition-all duration-300"
          >
            2. {t("Subscription & Billing")}
          </button>
          {activeSection === "billing" && (
            <p className="mt-2 bg-gray-700 rounded-lg p-4 shadow-inner text-gray-300 leading-relaxed">
              {t("Users are billed on a monthly basis")}. {t("Refunds are processed according to our cancellation policy")}.
            </p>
          )}
        </section>

        <section id="account-termination" className="space-y-4">
          <button
            onClick={() => handleToggleSection("account-termination")}
            className="w-full text-left text-xl font-semibold bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:bg-gray-700 transition-all duration-300"
          >
            3. {t("Account Termination")}
          </button>
          {activeSection === "account-termination" && (
            <p className="mt-2 bg-gray-700 rounded-lg p-4 shadow-inner text-gray-300 leading-relaxed">
              {t("We reserve the right to suspend or terminate accounts for violations of our terms or policies")}.
            </p>
          )}
        </section>

        <section id="governing-law" className="space-y-4">
          <button
            onClick={() => handleToggleSection("governing-law")}
            className="w-full text-left text-xl font-semibold bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:bg-gray-700 transition-all duration-300"
          >
            4. {t("Governing Law")}
          </button>
          {activeSection === "governing-law" && (
            <p className="mt-2 bg-gray-700 rounded-lg p-4 shadow-inner text-gray-300 leading-relaxed">
              {t("These terms are governed by the laws of the applicable jurisdiction")}.
            </p>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center bg-gray-700 rounded-xl shadow-md p-6 mt-10">
          <p className="text-gray-400 text-sm">
            {t("Questions")}? {t("Contact us at")}{" "}
            <a
              href="mailto:support@ewastetradehub.com"
              className="text-secondary font-medium hover:underline"
            >
              support@ewastetradehub.com
            </a>
            .
          </p>
        </footer>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 left-4 bg-secondary text-white px-6 py-3 rounded-full shadow-md hover:bg-secondary-dark transition-all duration-300"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default TermsAndConditions;
