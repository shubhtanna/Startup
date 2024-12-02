import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState({
    rating: "",
    username: "",
    comment: "",
  });

  // Fetch reviews from the database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setReviews(response.data);
        setFilteredReviews(response.data); // Initially, show all reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Calculate Average Rating
  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length > 0 ? (totalRating / reviews.length).toFixed(2) : 0;
  };

  // Find Top Rating Review
  const getTopRatingReview = () => {
    return reviews.reduce(
      (topReview, currentReview) =>
        currentReview.rating > topReview.rating ? currentReview : topReview,
      { rating: 0 }
    );
  };

  // Delete review function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:5000/api/reviews/${id}`);
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
        setFilteredReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== id)
        );
        toast.success("Review deleted successfully!");
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Failed to delete the review. Please try again.");
      }
    }
  };

  // Filter reviews based on the filter state
  const handleFilter = () => {
    let filtered = reviews;

    if (filter.rating) {
      filtered = filtered.filter((review) => review.rating == filter.rating);
    }

    if (filter.username) {
      filtered = filtered.filter((review) =>
        review.username.toLowerCase().includes(filter.username.toLowerCase())
      );
    }

    if (filter.comment) {
      filtered = filtered.filter((review) =>
        review.comment.toLowerCase().includes(filter.comment.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  };

  // Get the top-rated review
  const topReview = getTopRatingReview();

  return (
    <div className="max-h-[580px] overflow-hidden overflow-y-auto">
      <ToastContainer />
      {/* Top Rating Section */}
      <div className="ml-3 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start mb-6 overflow-x-auto">
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 w-full sm:w-auto flex flex-col items-center gap-2">
          <p className="text-xl font-semibold text-gray-800">Total Reviews: {reviews.length}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 w-full sm:w-auto flex flex-col items-center gap-2">
          <p className="text-lg font-medium text-gray-600">Average Rating: ⭐ {calculateAverageRating()}/5</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 w-full sm:w-auto flex flex-col items-center gap-2">
          <p className="text-lg font-medium text-gray-600">Top Review: ⭐ {topReview.rating}/5</p>
        </div>
      </div>

      <div className="ml-3 max-w-full sm:max-w-[87%] mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-300 mx-auto">
        {/* Filter Section */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <input
            type="text"
            placeholder="Filter by Username"
            value={filter.username}
            onChange={(e) => setFilter({ ...filter, username: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Filter by Comment"
            value={filter.comment}
            onChange={(e) => setFilter({ ...filter, comment: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
          />
          <select
            value={filter.rating}
            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
          >
            <option value="">Filter by Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
          >
            Apply Filter
          </button>
        </div>

        {/* Displaying Reviews */}
        {filteredReviews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-50 p-4 shadow-sm rounded-md border border-gray-200"
              >
                <div className="ml-0 flex flex-col gap-2 lg:w-1/2">
                  <p className="text-lg font-medium text-gray-700">
                    <span className="font-semibold">Username:</span> {review.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Comment:</span> {review.comment}
                  </p>
                </div>
                <div className="flex flex-col items-start lg:items-end lg:w-1/2 gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      review.rating >= 4
                        ? "bg-green-100 text-green-600"
                        : review.rating >= 3
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ⭐ {review.rating}/5
                  </span>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No reviews match your filter.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
