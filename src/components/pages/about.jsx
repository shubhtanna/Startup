import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import { useTranslation } from 'react-i18next';


const AboutUsPage = () => {

  const [users, setUsers] = useState([]);

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

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/all-users"); // Adjust the endpoint if necessary
        if (response.data.success) {
          setUsers(response.data.data); // Set the users in state
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

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

  return (
    <div>
      {/* hero section */}
      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px]">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-100">
          <img src={images.bg}
            alt="Background"
            className="object-cover object-center w-full h-full" />
        </div>

        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h1 className="text-green-400 font-medium text-3xl sm:text-4xl md:text-5xl leading-tight mb-2">
            {t('E-Waste Trade Hub')}
          </h1>
          <p className="font-regular text-lg sm:text-xl md:text-2xl mb-6 mt-4">
            {t('Reduce, Reuse, Recycle: Keep E-Waste in Check')}
          </p>
          <a
            href="#contactUs"
            className="px-6 py-3 bg-[#c8a876] text-white font-medium rounded-full hover:bg-[#c09858] transition duration-200"
          >
            {t('Contact Us')}
          </a>
        </div>
      </div>

      {/* About Us Section */}
      <section className="bg-gray-100" id="aboutus">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

            {/* Text Content */}
            <div className="max-w-lg mx-auto text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('About Us')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('Welcome to')} <span className="font-semibold text-gray-800">{t('E-Waste Trade Hub')}</span>, {t('a one-stop solution for managing electronic waste responsibly. Our platform bridges the gap between individuals, businesses, and recycling centers, creating a seamless way to buy, sell, or recycle electronic waste.')}
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                At <span className="font-semibold text-gray-800">{t('E-Waste Trade Hub')}</span>, {t('we believe in the')} <span className="font-semibold">{t('three Rs: Reduce, Reuse, Recycle')}</span>. {t('With the growing amount of e-waste globally, our mission is to empower users to make environmentally conscious decisions while contributing to a sustainable future.')}
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                By choosing <span className="font-semibold text-gray-800">E-Waste Trade Hub</span>, you’re not just managing your e-waste—you’re becoming part of a larger movement to safeguard the planet for future generations. Together, we can reduce the environmental footprint of electronic waste and create a greener, cleaner world.
              </p>

              {/* <ul className="mt-6 list-disc list-inside space-y-2 text-gray-600 text-lg">
          <li><strong>Sell Your E-Waste:</strong> Upload photos and details of your electronic waste. Get the best price recommendations and connect with verified buyers.</li>
          <li><strong>Buy Refurbished Devices:</strong> Find affordable, second-hand electronics that meet your needs while reducing e-waste.</li>
          <li><strong>Recycle Responsibly:</strong> Partner with certified recyclers to ensure safe disposal of electronic waste.</li>
          <li><strong>Reward System:</strong> Earn redeemable reward points for every transaction to promote eco-friendly practices.</li>
          <li><strong>Live Tracking:</strong> Track e-waste collection from your doorstep to the recycling center, ensuring transparency.</li>
          <li><strong>Multilingual Support:</strong> Access the platform in multiple languages for a user-friendly experience.</li>
        </ul> */}
            </div>

            {/* Image */}
            <div className="mt-12 md:mt-0">
              <img
                src={images.about}
                alt="About Us"
                className="w-full h-auto object-cover rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>
        </div>
      </section>


      {/* our services section */}
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={images.recommend} alt="Price Recommandation Engine"
                className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Price Recommendations</h3>
                <p className="text-gray-700 text-base">Our platform provides sellers with accurate and reliable price recommendations for their e-waste. These suggestions are generated based on market trends, demand, and the condition of the item, helping sellers get the best value for their electronic waste.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={images.messaging} alt="Messaging System"
                className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Messaging System</h3>
                <p className="text-gray-700 text-base">Our platform includes a secure messaging system that allows buyers and sellers to communicate directly. This feature makes it easy to negotiate prices, share additional details about the e-waste, and finalize deals conveniently and efficiently.</p>

              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={images.reward} alt="Reward Points"
                className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Reward Points</h3>
                <p className="text-gray-700 text-base">Our platform rewards users with points for every successful transaction. Sellers and shopkeepers earn redeemable points, which can be used for discounts or other perks, encouraging sustainable practices and repeat usage.
                  <details>
                    <summary>Read More</summary>
                    <p className="text-gray-700 text-base">Shopkeepers earn additional points for larger transaction volumes, making it even more beneficial for those dealing with bulk e-waste. This system ensures both buyers and sellers are rewarded for their contributions to eco-friendly waste management.</p>
                  </details>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={images.orderTracking} alt="Reward Points"
                className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Live Tracking</h3>
                <p className="text-gray-700 text-base">Our platform provides live tracking for e-waste collections, ensuring complete transparency and convenience. Sellers and buyers can monitor the status of their transactions and the movement of e-waste in real time.</p>
                <details>
                  <summary>Read More</summary>
                  <p className="text-gray-700 text-base">This feature enhances accountability and ensures that e-waste reaches the correct destination efficiently. It also builds trust between buyers, sellers, and our platform.</p>
                </details>
              </div>
            </div>
            {/* special card */}
            <div
              className="bg-white rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg overflow-hidden min-h-full">
              <div className="text-center text-white font-medium">Special Service</div>
              <img src={images.issueTicket} alt="Raise Issue Tickets"
                className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-6 bg-white text-center rounded-b-lg md:min-h-full">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Raise Issue Tickets</h3>
                <p className="text-gray-700 text-base">
                  <span className="font-medium underline">Our speciality is</span> providing a seamless issue resolution system. Users can raise issue tickets for any concerns or disputes related to transactions, deliveries, or platform usage. This ensures a smooth and reliable experience for buyers and sellers.
                </p>

              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={images.multiLanguage} alt="Multi Language Support"
                className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Multilingual Support</h3>
                <p className="text-gray-700 text-base">Our platform offers multilingual support, making it accessible to a wider audience. Users can navigate the site in their preferred language, ensuring a seamless experience for buyers and sellers from diverse linguistic backgrounds.</p>
                <details>
                  <summary>Read More</summary>
                  <p className="text-gray-700 text-base">We are continually expanding our language options to ensure that users from different regions can fully utilize the platform with ease, promoting inclusivity and a better user experience for all.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Us */}
      <section className="text-gray-700 body-font mt-10">
        <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
          Why Choose Us?
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap text-center justify-center">
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-1 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src={images.rewards}
                    alt="Reward Points"
                    className="w-32 mb-4 text-gray-700"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Reward Points System</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Earn points for every transaction and redeem them for exciting rewards.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-1 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src={images.bestPrice}
                    alt="Best Prices"
                    className="w-32 mb-4"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Best Price Guarantee</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Get the most value for your electronic waste with our price recommendations.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-1 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src={images.liveLocation}
                    alt="Live Tracking"
                    className="w-32 mb-4"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Live Tracking</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Track the status of your e-waste collection and delivery in real-time.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-1 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src={images.eco}
                    alt="Eco-Friendly"
                    className="w-32 mb-4"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Eco-Friendly Practices</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Contribute to a cleaner planet by recycling e-waste responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Users Section */}
      <section className="text-gray-700 body-font cursor-pointer rounded-xl" id="users">
        <div className="py-8 bg-gray-400 border-2 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Meet Our Users
          </h2>
          <div className="flex justify-center ">
            <div className="overflow-hidden w-full relative transition duration-300 hover:scale-105 ">
              {/* Scrolling Wrapper */}
              <div className="flex space-x-11 px-4 sm:px-8 animate-scroll">
                {users
                  .filter((user) => user.accountType !== "admin") // Filter out admins
                  .map((user) => (
                    <div
                      key={user._id} // Use _id from MongoDB
                      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg active:translate-y-2 active:shadow-md"
                    >
                      <img
                        src={user?.image || "https://via.placeholder.com/150"}
                        alt={`profile-${user.firstName} ${user.lastName}`}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-800 text-center">
                        {`${user.firstName} ${user.lastName}`}
                      </h3>
                      <p className="text-gray-600 text-center">{user?.accountType}</p>
                      <p className="text-gray-500 text-center">
                        {user?.city}, {user?.state}
                      </p>
                      <p className="text-gray-400 text-center text-sm mt-2">
                        {user?.address}
                      </p>
                      <p className="text-gray-500 mt-2 text-sm text-center">
                        {user?.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
 

      {/* gallery */}
      <section className="text-gray-700 body-font" id="gallery">
        <div className="flex justify-center text-3xl font-bold text-gray-800 text-center py-10">
          Gallery
        </div>
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="A scenic view of nature with vibrant colors"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105 hover:shadow-lg"
            />

          </div>
          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Scenic view of nature with vibrant colors"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />

          </div>
          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="A scenic view of nature with vibrant colors and soft tones"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform duration-300 ease-in-out transform scale-100 group-hover:scale-105"
            />

          </div>
          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="A serene natural landscape with vibrant colors"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />

          </div>
        </div>
      </section>

      {/* Visit us section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900" id="contactUs">Visit Our Location</h2>
            <p className="mt-3 text-lg text-gray-500">Let us serve you the best</p>
          </div>
          <div className="mt-8 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">Contact</h3>
                    <p className="mt-1 font-bold text-gray-600"><a href="tel:+123">Phone: +91 123456789</a></p>
                    <a className="flex m-1" href="tel:+919823331842">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-between h-10 w-30 rounded-md bg-indigo-500 text-white p-2">
                          {/* Heroicon name: phone */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          Call now
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Our Address</h3>
                    <p className="mt-1 text-gray-600">Sale galli, 60 foot road, Latur</p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                    <p className="mt-1 text-gray-600">Monday - Sunday : 2pm - 9pm</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden order-none sm:order-first">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.7850672491236!2d76.58802159999999!3d18.402630699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf83ca88e84341%3A0x841e547bf3ad066d!2zQmFwcGEgZmxvdXIgbWlsbCB8IOCkrOCkquCljeCkquCkviDgpKrgpYDgpKAg4KSX4KS_4KSw4KSj4KWALCDgpK7gpL_gpLDgpJrgpYAg4KSV4KS-4KSC4KSh4KSqIOCkhuCko-CkvyDgpLbgpYfgpLXgpL7gpK_gpL4!5e0!3m2!1sen!2sin!4v1713433597892!5m2!1sen!2sin"
                  className="w-full"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps showing Bappa Flour Mill location"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <section>
        <footer className="bg-gray-200 text-white py-4 px-3">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full md:w-1/2 md:text-center md:mb-4 mb-8">
              <p className="text-xs text-gray-400 md:text-sm">Copyright 2024 &copy; All Rights Reserved</p>
            </div>
            <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
              <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li><a href="#contactUs" className="text-gray-400 hover:text-white">Contact</a></li>
                <li className="mx-4"><a href="/term" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default AboutUsPage
