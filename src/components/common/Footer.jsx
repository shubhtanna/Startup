import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLeaf } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

const Footer = () => {
  const { t } = useTranslation();
  const [logoImageURL, setLogoImageURL] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "gs://t-music-be993.appspot.com/E-Waste/LOGO.png");
        const url = await getDownloadURL(imageRef);
        setLogoImageURL(url);
      } catch (error) {
        console.error("Error fetching image from Firebase Storage:", error);
      }
    };
    fetchImage();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-[#1c3c32] to-[#0d201a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              {logoImageURL ? (
                <img src={logoImageURL} alt="E-Waste Trade Hub Logo" className="w-32 h-auto" />
              ) : (
                <div className="text-2xl font-bold">E-Waste Trade Hub</div>
              )}
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("Pioneering sustainable solutions for electronic waste management. Together, we can transform e-waste into valuable resources.")}
            </p>
            
            <div className="pt-2">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <FaLeaf className="text-green-400" />
                <span className="font-semibold text-green-400">{t("Certified Sustainable")}</span>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
              {[
                { Icon: FaLinkedinIn, link: "https://linkedin.com" },
                { Icon: FaFacebookF, link: "https://facebook.com" },
                { Icon: FaInstagram, link: "https://instagram.com" },
                { Icon: FaTwitter, link: "https://twitter.com" },
                { Icon: FaYoutube, link: "https://youtube.com" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                >
                  <social.Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t("Quick Links")}</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "E-Waste Collection", path: "/collection" },
                { name: "Marketplace", path: "/marketplace" },
                { name: "FAQs", path: "/faqs" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="text-[#4caf50] mr-2">›</span>
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t("Contact Us")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#4caf50] text-lg mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Recycling Way, Green City, 
                  <br />Environment State, 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#4caf50] text-lg flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#4caf50] text-lg flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@ewastetradehub.com</span>
              </li>
            </ul>
            
            <div className="mt-6 bg-white/5 rounded-lg p-4">
              <h5 className="text-sm font-medium mb-2">{t("Business Hours")}</h5>
              <p className="text-gray-300 text-xs">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t("Stay Updated")}</h4>
            <p className="text-gray-300 text-sm mb-4">
              {t("Subscribe to our newsletter for the latest updates on e-waste management practices and offers.")}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("Your email address")}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#4caf50] hover:bg-[#3d8b40] rounded-lg text-white font-medium transition-colors duration-200 text-sm"
              >
                {t("Subscribe")}
              </button>
            </form>
            
            <p className="mt-4 text-xs text-gray-400">
              {t("By subscribing, you agree to our")} <Link to="/privacy-policy" className="underline hover:text-white">{t("Privacy Policy")}</Link>
            </p>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-300">ISO 14001 Certified</span>
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-300">E-Waste Alliance Member</span>
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-300">Green Business Certified</span>
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-300">Sustainable Recycling Initiative</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-black/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} {t("E-Waste Trade Hub")}. {t("All rights reserved")}
          </div>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <Link to="/term" className="hover:text-white transition-colors duration-200">
              {t("Terms of Service")}
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">
              {t("Privacy Policy")}
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors duration-200">
              {t("Cookie Policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;