import React, { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm';

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
    <div className="py-5 bg-[#DCE2DE] overflow-hidden relative">
      {/* Timer Overlay */}
      {isSubmitted && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
          <p className="text-sm">
            Time Left: <span className="font-bold">{formatTime(timeLeft)}</span>
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto py-10 px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">User Reviews</h1>

        {/* Show Review Form or Review Ticket */}
        {!isSubmitted ? (
          <ReviewForm onSubmit={handleReviewSubmit} />
        ) : (
          <div className="bg-white p-4 md:p-6 rounded shadow">
            <h2 className="text-lg md:text-xl font-bold mb-2">Your Review</h2>
            <p className="text-gray-700 mb-4">Thank you for your review!</p>
            <p className="text-sm text-gray-500 mb-4">
              You can edit or delete your review within the next {formatTime(timeLeft)}.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleEditDelete}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-sm md:text-base"
              >
                Edit/Delete Review
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className=" bg-gray-800 text-white py-5 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left mb-2 md:mb-0">
            <p className="text-sm md:text-base text-gray-400">
              Copyright 2024 &copy; E-Waste Trade Hub. All Rights Reserved.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <li>
                <a
                  href="#contactUs"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/term"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/review"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Review
                </a>
              </li>
              <li>
                <a
                  href="/teams"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Team Members
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Review;
