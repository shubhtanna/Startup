 import React, { useState, useEffect } from "react";
import axios from "axios";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center justify-center space-x-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-3xl cursor-pointer transition-all duration-300 ${
            star <= rating ? "text-yellow-400 scale-110" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    rating: 0,
    comment: "",
  });
  const [message, setMessage] = useState("");
  const [userReview, setUserReview] = useState(null); // Store the review
  const [isEditable, setIsEditable] = useState(false); // Control editability
  const [remainingTime, setRemainingTime] = useState(0); // Time left for editing

  // Load review from localStorage on initial render
  useEffect(() => {
    const savedReview = JSON.parse(localStorage.getItem("userReview"));
    if (savedReview) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - savedReview.timestamp;

      if (timeElapsed < 15 * 60 * 1000) {
        setUserReview(savedReview);
        setIsEditable(true);
        setRemainingTime(15 * 60 * 1000 - timeElapsed);
      } else {
        localStorage.removeItem("userReview"); // Clear expired review
      }
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1000);
      }, 1000);

      // Show notification if 1 minute is left
      if (remainingTime <= 60 * 1000) {
        setMessage("Only 1 minute left to edit your review!");
      }

      return () => clearInterval(timer);
    } else {
      setIsEditable(false); // Disable editing when time is up
    }
  }, [remainingTime]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().getTime();

    try {
      await axios.post("http://localhost:5000/api/reviews", formData);
      setMessage("Review added successfully!");
      const reviewData = { ...formData, timestamp };
      setUserReview(reviewData);
      setIsEditable(true);
      setRemainingTime(15 * 60 * 1000);
      localStorage.setItem("userReview", JSON.stringify(reviewData));
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to add review.");
    }
  };

  // Handle review update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, formData);
      const updatedReview = { ...userReview, ...formData };
      setUserReview(updatedReview);
      localStorage.setItem("userReview", JSON.stringify(updatedReview));
      setMessage("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      setMessage("Failed to update review.");
    }
  };

  // Handle review deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setUserReview(null);
      setIsEditable(false);
      localStorage.removeItem("userReview");
      setMessage("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      setMessage("Failed to delete review.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 to-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-extrabold text-center text-blue-600 mb-6">
        Leave Your Feedback
      </h2>
      {message && (
        <p
          className={`text-center mb-6 text-lg font-semibold ${
            message.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {userReview ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-center text-gray-800">
            Your Review
          </h3>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="font-medium">Username: {userReview.username}</p>
            <p className="flex items-center">
              Rating: <StarRating rating={userReview.rating} setRating={() => {}} />
            </p>
            <p>Comment: {userReview.comment}</p>
          </div>

          {isEditable && (
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
              >
                Edit Review
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
              >
                Delete Review
              </button>
            </div>
          )}
          {!isEditable && <p className="text-center text-gray-500">Editing time has expired.</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating
            </label>
            <StarRating
              rating={formData.rating}
              setRating={(rating) =>
                setFormData({ ...formData, rating: rating })
              }
            />
          </div>

          <div className="relative">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Share your thoughts"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
