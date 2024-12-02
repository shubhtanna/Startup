import express from "express";
import Review from "../models/Review.js"; // Correct import path for the Review model

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }); // Fetch reviews sorted by latest
        res.json(reviews); // Send as JSON response
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});

// Add a new review
router.post("/", async (req, res) => {
    const { username, rating, comment } = req.body;

    // Input validation
    if (!username || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    try {
        const review = new Review({ username, rating, comment }); // Create new review instance
        const savedReview = await review.save(); // Save to MongoDB
        res.status(201).json(savedReview); // Respond with created review
    } catch (err) {
        console.error("Error saving review:", err);
        res.status(500).json({ message: "Failed to save review" });
    }
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params; // Extract the review ID from request params

    try {
        const deletedReview = await Review.findByIdAndDelete(id); // Delete review from MongoDB
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully", review: deletedReview });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ message: "Failed to delete review" });
    }
});

export default router;
