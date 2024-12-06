import { User } from "../models/User.js"; // Adjust path if necessary

// Controller to fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "firstName lastName email accountType city state address image"
    ); // Select only necessary fields
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

// Controller to fetch a single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // User ID from request params
    const user = await User.findById(id).populate("profile").exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
    });
  }
};

// Controller to update user data
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from request params
    const updatedData = req.body; // Data to update

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from request params

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

// Controller to fetch profile data (example for authenticated users)
export const getProfileData = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID

    const userDetails = await User.findById(userId)
      .populate("profile") // Populate the related profile
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching profile data",
    });
  }
};
