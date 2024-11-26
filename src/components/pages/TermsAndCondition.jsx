import React, { useState } from "react";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleToggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="bg-[#DCE2DE] text-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-10">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-primary">Terms & Conditions</h1>
          <p className="mt-2 text-gray-600">
            Effective Date: <span className="font-medium">1st Jan 2024</span>
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="bg-gray-100 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-3">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#welcome" className="text-primary hover:underline">
                Welcome to E-Waste Trade Hub
              </a>
            </li>
            <li>
              <a href="#user-obligations" className="text-primary hover:underline">
                User Obligations
              </a>
            </li>
            <li>
              <a href="#prohibited-activities" className="text-primary hover:underline">
                Prohibited Activities
              </a>
            </li>
            <li>
              <a href="#liability-disclaimer" className="text-primary hover:underline">
                Liability Disclaimer
              </a>
            </li>
          </ul>
        </nav>

        {/* Sections */}
        <section id="welcome" className="space-y-4">
          <h2 className="text-2xl font-semibold text-secondary">
            Welcome to E-Waste Trade Hub
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Thank you for choosing the E-Waste Trade Hub platform. By accessing or using our
            services, you agree to the following terms and conditions. Please read them
            carefully.
          </p>
        </section>

        {/* Expandable Section: User Obligations */}
        <section id="user-obligations" className="space-y-4">
          <button
            onClick={() => handleToggleSection("user-obligations")}
            className="w-full text-left text-xl font-semibold bg-gray-200 p-3 rounded-lg"
          >
            1. User Obligations
          </button>
          {activeSection === "user-obligations" && (
            <p className="mt-2 text-gray-700 leading-relaxed">
              As a user, you agree to provide accurate information, maintain the security of
              your account, and comply with all applicable laws.
            </p>
          )}
        </section>

        {/* Expandable Section: Prohibited Activities */}
        <section id="prohibited-activities" className="space-y-4">
          <button
            onClick={() => handleToggleSection("prohibited-activities")}
            className="w-full text-left text-xl font-semibold bg-gray-200 p-3 rounded-lg"
          >
            2. Prohibited Activities
          </button>
          {activeSection === "prohibited-activities" && (
            <ul className="mt-2 list-disc list-inside text-gray-600 space-y-2">
              <li>Illegal trading of e-waste.</li>
              <li>Spreading misinformation.</li>
              <li>Unauthorized access or tampering with other users' data.</li>
            </ul>
          )}
        </section>

        {/* Expandable Section: Liability Disclaimer */}
        <section id="liability-disclaimer" className="space-y-4">
          <button
            onClick={() => handleToggleSection("liability-disclaimer")}
            className="w-full text-left text-xl font-semibold bg-gray-200 p-3 rounded-lg"
          >
            3. Liability Disclaimer
          </button>
          {activeSection === "liability-disclaimer" && (
            <p className="mt-2 text-gray-700 leading-relaxed">
              E-Waste Trade Hub is not responsible for any misuse of the platform. Users are
              responsible for ensuring their actions comply with legal requirements.
            </p>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center border-t border-gray-300 pt-6">
          <p className="text-gray-600">
            By using our platform, you agree to our terms. If you have any questions, contact
            us at{" "}
            <a
              href="mailto:support@ewastetradehub.com"
              className="text-primary font-medium hover:underline"
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
        className="fixed bottom-4 left-4 bg-secondary text-black px-4 py-2 rounded-full shadow-md"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default TermsAndConditions;
