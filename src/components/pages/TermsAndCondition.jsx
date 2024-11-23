import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-4 md:p-8 lg:px-16 lg:py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-10 space-y-6">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mt-2">
            Effective Date: <span className="font-medium">1st Jan 2024</span>
          </p>
        </header>

        {/* Introduction Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-secondary">
            Welcome to E-Waste Trade Hub
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Thank you for choosing the E-Waste Trade Hub platform. By accessing
            or using our services, you agree to the following terms and
            conditions. Please read them carefully.
          </p>
        </section>

        {/* Terms Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">1. User Obligations</h3>
            <p className="text-gray-700 leading-relaxed">
              As a user, you agree to provide accurate information, maintain the
              security of your account, and comply with all applicable laws.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">2. Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed">
              The following activities are strictly prohibited:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Illegal trading of e-waste.</li>
              <li>Spreading misinformation.</li>
              <li>Unauthorized access or tampering with other users' data.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">3. Liability Disclaimer</h3>
            <p className="text-gray-700 leading-relaxed">
              E-Waste Trade Hub is not responsible for any misuse of the
              platform. Users are responsible for ensuring their actions comply
              with legal requirements.
            </p>
          </div>
        </section>

        {/* Closing Section */}
        <footer className="text-center border-t border-gray-200 pt-6">
          <p className="text-gray-600">
            By using our platform, you agree to our terms. If you have any
            questions, contact us at{" "}
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
    </div>
  );
};

export default TermsAndConditions;
