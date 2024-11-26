import mongoose from "mongoose";

// Define the Review schema
const ReviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Ensures the username field is mandatory
        trim: true, // Removes extra whitespace
    },
    rating: {
        type: Number,
        required: true, // Ensures the rating field is mandatory
        min: 1, // Minimum rating is 1
        max: 5, // Maximum rating is 5
    },
    comment: {
        type: String,
        required: true, // Ensures the comment field is mandatory
        trim: true, // Removes extra whitespace
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the current date/time
    },
});

// Create and export the Review model
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
