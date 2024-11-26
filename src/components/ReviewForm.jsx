import React, { useState } from "react";
import axios from "axios";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    rating: "",
    comment: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/reviews", formData);
      setMessage("Review added successfully!");
      setFormData({ username: "", rating: "", comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to add review.");
    }
  };

  return (
    <div className="mb-9 ">
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded-md border border-gray-200"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
