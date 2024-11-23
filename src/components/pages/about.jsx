import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold uppercase">About Us</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">That's We're On Build of Construction</h2>
              <p className="text-gray-600 mb-6">
                Our company provides exceptional construction services, architectural solutions, and project management that meet all your needs.
              </p>
              <div className="flex gap-6">
                <div>
                  <h3 className="text-4xl font-bold text-red-500">330+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-red-500">12K+</h3>
                  <p className="text-gray-600">Satisfied Clients</p>
                </div>
              </div>
            </div>
            <div>
              <img src="/hero-side-image.jpg" alt="Construction workers" className="rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Our Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {["General Construction", "Project Management", "Interior Design", "Electrical Design & Build"].map((service, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                <div className="text-red-500 text-4xl mb-4">
                  {/* Replace with an actual icon */}
                  <i className="fas fa-tools"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Offer Idea For Construction</h2>
            <p className="text-gray-600 mb-6">
              We provide sustainable solutions for construction projects while maintaining the highest quality standards.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Comprehensive project management</li>
              <li>Eco-friendly and cost-effective solutions</li>
              <li>World-class architectural designs</li>
            </ul>
          </div>
          <div>
            <img src="/why-choose-us.jpg" alt="Why Choose Us" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 flex justify-center gap-12 text-center">
          {[
            { label: "Projects Completed", value: "12K+" },
            { label: "Happy Clients", value: "1.5K+" },
            { label: "Awards Won", value: "14" },
            { label: "Years of Experience", value: "50+" },
          ].map((stat, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {[
              { name: "John Doe", role: "Project Manager", img: "/team1.jpg" },
              { name: "Jane Smith", role: "Architect", img: "/team2.jpg" },
              { name: "Sam Wilson", role: "Engineer", img: "/team3.jpg" },
            ].map((team, index) => (
              <div key={index} className="flex-shrink-0 w-60 bg-white shadow-lg rounded-lg p-6 text-center">
                <img src={team.img} alt={team.name} className="h-24 w-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
                <p className="text-gray-600">{team.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
