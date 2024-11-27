import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className=" mt-1 overflow-hidden w-full relative transition duration-300 ">
      {reviews.length > 0 ? (
        <div className="flex justify-center space-x-6 py-6 px-4 md:px-8  sm:px-8 animate-infinite-scroll">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex-shrink-0 w-72 md:w-80 p-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              {/* User Avatar */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xl">
                  {review.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-800">{review.username}</h3>
                  <span className="text-sm text-gray-500">Verified User</span>
                </div>
              </div>

              {/* Review Rating */}
              <div className="flex items-center mb-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    review.rating >= 4
                      ? "bg-green-100 text-green-600"
                      : review.rating >= 3
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  ⭐ {review.rating}/5
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
