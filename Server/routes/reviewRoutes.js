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

// Export the router
export default router;
