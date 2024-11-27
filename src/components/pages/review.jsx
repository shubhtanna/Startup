import React from 'react'
import ReviewForm from '../ReviewForm'

const Review = () => {
  return (
    <div className="min-h-[70%] bg-[#DCE2DE] overflow-hidden">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">User Reviews</h1>
        <ReviewForm />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-[23px] px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Left Section */}
          <div className="w-full md:w-1/2 md:text-left text-center mb-6 md:mb-0">
            <p className="text-sm md:text-base text-gray-400">
              Copyright 2024 &copy; E-Waste Trade Hub. All Rights Reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <ul className="list-reset flex justify-center md:justify-end flex-wrap text-sm gap-4">
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
  )
}

export default Review;
