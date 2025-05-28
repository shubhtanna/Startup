import React, { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiEdit, FiCheck } from 'react-icons/fi';

const Review = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const storedSubmissionTime = localStorage.getItem('reviewSubmissionTime');
    if (storedSubmissionTime) {
      const timeElapsed = Math.floor((Date.now() - parseInt(storedSubmissionTime, 10)) / 1000);
      const remainingTime = 15 * 60 - timeElapsed;

      if (remainingTime > 0) {
        setIsSubmitted(true);
        setTimeLeft(remainingTime);
      } else {
        localStorage.removeItem('reviewSubmissionTime');
      }
    }
  }, []);

  // Handle timer countdown
  useEffect(() => {
    let timer;
    if (isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsSubmitted(false);
            localStorage.removeItem('reviewSubmissionTime');
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  // Format time (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle form submission
  const handleReviewSubmit = () => {
    setIsSubmitted(true);
    setTimeLeft(15 * 60); // Reset timer
    localStorage.setItem('reviewSubmissionTime', Date.now().toString()); // Save submission time
  };

  // Handle review edit or delete
  const handleEditDelete = () => {
    setIsSubmitted(false); // Allow user to edit or delete review
    setTimeLeft(15 * 60); // Reset timer
    localStorage.removeItem('reviewSubmissionTime'); // Remove from localStorage
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col">
      <main className="flex-grow">
        {/* Timer Notification */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-4 right-4 bg-white border-l-4 border-green-500 text-green-700 px-4 py-3 rounded shadow-lg z-50 flex items-center"
            >
              <FiClock className="mr-2" />
              <p className="text-sm">
                Edit window: <span className="font-bold">{formatTime(timeLeft)}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
              <span className="text-green-600">Share</span> Your Experience
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Your feedback helps our community make better decisions about e-waste.
            </p>
          </div>

          {/* Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Show Review Form or Review Confirmation */}
            {!isSubmitted ? (
              <div className="p-6 sm:p-8">
                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 rounded-full p-3">
                    <FiCheck className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Thank You!</h2>
                <p className="text-center text-gray-600 mb-6">
                  Your review has been successfully submitted and will help others in their e-waste journey.
                </p>
                <p className="text-sm text-center text-gray-500 mb-6 bg-green-50 py-2 px-4 rounded-lg">
                  You can edit or delete your review within the next {formatTime(timeLeft)}.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleEditDelete}
                    className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    <FiEdit className="mr-2" /> Edit Review
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">E-Waste Trade Hub</h3>
              <p className="text-gray-400 text-sm">
                Dedicated to creating a sustainable future through responsible e-waste management and trading.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/home" className="text-gray-400 hover:text-green-400 transition-colors">Home</a>
                </li>
                <li>
                  <a href="/marketplace" className="text-gray-400 hover:text-green-400 transition-colors">Marketplace</a>
                </li>
                <li>
                  <a href="/education" className="text-gray-400 hover:text-green-400 transition-colors">Education</a>
                </li>
                <li>
                  <a href="/review" className="text-gray-400 hover:text-green-400 transition-colors">Reviews</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Connect With Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#contactUs" className="text-gray-400 hover:text-green-400 transition-colors">Contact Us</a>
                </li>
                <li>
                  <a href="/term" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="/teams" className="text-gray-400 hover:text-green-400 transition-colors">Our Team</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} E-Waste Trade Hub. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Review;