import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaRecycle, FaLeaf } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6'; // Correct import for Font Awesome 6 icon
import { FaChevronDown } from 'react-icons/fa';
import ReviewList from '../ReviewList';
import Users from './users';

const AboutUsPage = () => {
  const [images, setImages] = useState({
    eco: '',
    multi: '',
    liveLocation: '',
    bestPrice: '',
    rewards: '',
    multiLanguage: '',
    IssueTicket: '',
    orderTracking: '',
    reward: '',
    messaging: '',
    recommend: '',
    about: '',
    bg: '',
  });

  const { t } = useTranslation();

  useEffect(() => {
    const fetchImages = async () => {
      const imagePaths = {
        eco: 'E-Waste/Eco.png',
        multi: 'E-Waste/Multi.png',
        liveLocation: 'E-Waste/LiveLocation.png',
        bestPrice: 'E-Waste/BestPrice.png',
        rewards: 'E-Waste/Rewards.png',
        multiLanguage: 'E-Waste/MultiLanguage.png',
        issueTicket: 'E-Waste/IssueTicket.png',
        orderTracking: 'E-Waste/OrderTrack.png',
        reward: 'E-Waste/Reward.png',
        messaging: 'E-Waste/Messaging.png',
        recommend: 'E-Waste/Recommend.png',
        about: 'E-Waste/E-WasteAbout.png',
        bg: 'E-Waste/bg.jpg',
      };

      try {
        const imagePromises = Object.entries(imagePaths).map(async ([key, path]) => {
          const imageRef = ref(storage, `gs://t-music-be993.appspot.com/${path}`);
          const url = await getDownloadURL(imageRef);
          return [key, url];
        });

        // Resolve all promises and update the state
        const urls = await Promise.all(imagePromises);
        const updatedImages = Object.fromEntries(urls);
        setImages(updatedImages);
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error);
      }
    };

    fetchImages();
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#174B3A]/90 to-[#174B3A]/70 z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={images.bg}
            alt="E-Waste Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Content */}
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-white">
                {t('E-Waste Trade Hub')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('Reduce, Reuse, Recycle: Keep E-Waste in Check')}
            </p>
            <a
              href="#contactUs"
              className="inline-flex items-center px-8 py-4 bg-white text-[#174B3A] font-medium rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('Contact Us')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white">
              <a href="#aboutus" className="animate-bounce inline-block">
                <FaChevronDown className="w-8 h-8 opacity-70" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="aboutus" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Text Content */}
            <motion.div variants={fadeInUp} className="order-2 md:order-1">
              <div className="inline-block px-3 py-1 text-sm font-medium bg-[#174B3A]/10 text-[#174B3A] rounded-full mb-4">
                {t('Our Mission & Vision')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {t('About')} <span className="text-[#174B3A]">{t('E-Waste Trade Hub')}</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  {t('Welcome to')} <span className="font-semibold text-gray-800">{t('E-Waste Trade Hub')}</span>, {t('a one-stop solution for managing electronic waste responsibly. Our platform bridges the gap between individuals, businesses, and recycling centers, creating a seamless way to buy, sell, or recycle electronic waste.')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('At')} <span className="font-semibold text-gray-800">{t('E-Waste Trade Hub')}</span>, {t('we believe in the')} <span className="font-semibold text-[#174B3A]">{t('three Rs: Reduce, Reuse, Recycle')}</span>. {t('With the growing amount of e-waste globally, our mission is to empower users to make environmentally conscious decisions while contributing to a sustainable future.')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('By choosing')} <span className="font-semibold text-gray-800">{t('E-Waste Trade Hub')}</span>, {t("you're not just managing your e-waste—you're becoming part of a larger movement to safeguard the planet for future generations. Together, we can reduce the environmental footprint of electronic waste and create a greener, cleaner world.")}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center text-[#174B3A]">
                  <FaRecycle className="mr-2" />
                  <span className="font-medium">{t('Reduce')}</span>
                </div>
                <div className="flex items-center text-[#174B3A]">
                  <FaLeaf className="mr-2" />
                  <span className="font-medium">{t('Reuse')}</span>
                </div>
                <div className="flex items-center text-[#174B3A]">
                  <FaEarthAmericas className="mr-2" />
                  <span className="font-medium">{t('Recycle')}</span>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div 
              variants={fadeInUp}
              className="order-1 md:order-2"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#c8a876]/10 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#174B3A]/10 rounded-full"></div>
                
                {/* Main image with border */}
                <div className="relative border-8 border-white rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={images.about}
                    alt="About E-Waste Trade Hub"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 text-sm font-medium bg-[#174B3A]/10 text-[#174B3A] rounded-full mb-4">
              {t('What We Offer')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('Our Services')}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {t('Discover how we make e-waste management easy, efficient, and environmentally friendly with our comprehensive service offerings.')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Price Recommendations */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeInUp}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={images.recommend} 
                  alt="Price Recommendation Engine"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t('Price Recommendations')}
                </h3>
                <p className="text-gray-600">
                  {t('Our platform provides sellers with accurate and reliable price recommendations for their e-waste. These suggestions are generated based on market trends, demand, and the condition of the item, helping sellers get the best value for their electronic waste.')}
                </p>
              </div>
            </motion.div>

            {/* Messaging System */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeInUp}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={images.messaging} 
                  alt="Messaging System"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t('Messaging System')}
                </h3>
                <p className="text-gray-600">
                  {t('Our platform includes a secure messaging system that allows buyers and sellers to communicate directly. This feature makes it easy to negotiate prices, share additional details about the e-waste, and finalize deals conveniently and efficiently.')}
                </p>
              </div>
            </motion.div>

            {/* Reward Points */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeInUp}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={images.reward} 
                  alt="Reward Points"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t('Reward Points')}
                </h3>
                <p className="text-gray-600">
                  {t('Our platform rewards users with points for every successful transaction. Sellers and shopkeepers earn redeemable points, which can be used for discounts or other perks, encouraging sustainable practices and repeat usage.')}
                </p>
                <details className="mt-3">
                  <summary className="text-[#174B3A] font-medium cursor-pointer">
                    {t('Read More')}
                  </summary>
                  <p className="mt-2 text-gray-600">
                    {t('Shopkeepers earn additional points for larger transaction volumes, making it even more beneficial for those dealing with bulk e-waste. This system ensures both buyers and sellers are rewarded for their contributions to eco-friendly waste management.')}
                  </p>
                </details>
              </div>
            </motion.div>

            {/* Live Tracking */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeInUp}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={images.orderTracking} 
                  alt="Live Tracking"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t('Live Tracking')}
                </h3>
                <p className="text-gray-600">
                  {t('Our platform provides live tracking for e-waste collections, ensuring complete transparency and convenience. Sellers and buyers can monitor the status of their transactions and the movement of e-waste in real time.')}
                </p>
                <details className="mt-3">
                  <summary className="text-[#174B3A] font-medium cursor-pointer">
                    {t('Read More')}
                  </summary>
                  <p className="mt-2 text-gray-600">
                    {t('This feature enhances accountability and ensures that e-waste reaches the correct destination efficiently. It also builds trust between buyers, sellers, and our platform.')}
                  </p>
                </details>
              </div>
            </motion.div>

            {/* Special Service */}
            <motion.div 
              className="relative bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl col-span-1 md:col-span-2 lg:col-span-1"
              variants={fadeInUp}
            >
              <div className="absolute top-4 right-4 bg-white/80 text-blue-600 font-medium text-sm py-1 px-3 rounded-full backdrop-blur-sm">
                {t('Special Service')}
              </div>
              <div className="bg-white rounded-2xl h-full">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={images.issueTicket} 
                    alt="Raise Issue Tickets"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {t('Raise Issue Tickets')}
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium text-blue-600 underline">{t('Our speciality is')}</span> {t('providing a seamless issue resolution system. Users can raise issue tickets for any concerns or disputes related to transactions, deliveries, or platform usage. This ensures a smooth and reliable experience for buyers and sellers.')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Multilingual Support */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={fadeInUp}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={images.multiLanguage} 
                  alt="Multi Language Support"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {t('Multilingual Support')}
                </h3>
                <p className="text-gray-600">
                  {t('Our platform offers multilingual support, making it accessible to a wider audience. Users can navigate the site in their preferred language, ensuring a seamless experience for buyers and sellers from diverse linguistic backgrounds.')}
                </p>
                <details className="mt-3">
                  <summary className="text-[#174B3A] font-medium cursor-pointer">
                    {t('Read More')}
                  </summary>
                  <p className="mt-2 text-gray-600">
                    {t('We are continually expanding our language options to ensure that users from different regions can fully utilize the platform with ease, promoting inclusivity and a better user experience for all.')}
                  </p>
                </details>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#174B3A] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full mb-4">
              {t('Our Advantages')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('Why Choose Us?')}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-green-100">
              {t('What makes E-Waste Trade Hub the preferred choice for electronic waste management')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Reward Points System */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={images.rewards}
                  alt="Reward Points"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('Reward Points System')}</h3>
              <p className="text-green-100">
                {t('Earn points for every transaction and redeem them for exciting rewards.')}
              </p>
            </motion.div>

            {/* Best Price Guarantee */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={images.bestPrice}
                  alt="Best Prices"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('Best Price Guarantee')}</h3>
              <p className="text-green-100">
                {t('Get the most value for your electronic waste with our price recommendations.')}
              </p>
            </motion.div>

            {/* Live Tracking */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={images.liveLocation}
                  alt="Live Tracking"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('Live Tracking')}</h3>
              <p className="text-green-100">
                {t('Track the status of your e-waste collection and delivery in real-time.')}
              </p>
            </motion.div>

            {/* Eco-Friendly Practices */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={images.eco}
                  alt="Eco-Friendly"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('Eco-Friendly Practices')}</h3>
              <p className="text-green-100">
                {t('Contribute to a cleaner planet by recycling e-waste responsibly.')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Users Section */}
      <section id="users" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 text-sm font-medium bg-[#174B3A]/10 text-[#174B3A] rounded-full mb-4">
              {t('Our Community')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('Meet Our Users')}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {t('Get to know the people who make our e-waste ecosystem thrive')}
            </p>
          </motion.div>

          <Users />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 text-sm font-medium bg-[#174B3A]/10 text-[#174B3A] rounded-full mb-4">
              {t('Testimonials')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('What Our Users Say')}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {t('Read authentic experiences from our community of buyers and sellers')}
            </p>
          </motion.div>

          <ReviewList />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">{t('E-Waste Trade Hub')}</h3>
              <p className="text-gray-400 text-sm">
                {t('Transforming electronic waste management for a sustainable future.')}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#contactUs" className="text-gray-300 hover:text-white transition-colors">
                {t('Contact Us')}
              </a>
              <a href="/term" className="text-gray-300 hover:text-white transition-colors">
                {t('Privacy Policy')}
              </a>
              <a href="/review" className="text-gray-300 hover:text-white transition-colors">
                {t('Review')}
              </a>
              <a href="/teams" className="text-gray-300 hover:text-white transition-colors">
                {t('Team Members')}
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              {t('Copyright')} &copy; {new Date().getFullYear()} {t('E-Waste Trade Hub')}. {t('All Rights Reserved.')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;