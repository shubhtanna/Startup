import { User } from "../models/User.js";
import { Otp } from "../models/Otp.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { respond } from "../utils/response.js";
import { emailVerificationRes } from "../templates/emailVerificationRes.js";
import { mailsender } from "../utils/mailSender.js";
import { Profile } from "../models/Profile.js";
import { Vendor } from "../models/Vendor.js";

dotenv.config();

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email: email });

    if (checkUserPresent) {
      return respond(res, "User already exist", 400, false);
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generated: ", otp);

    let result = await Otp.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await otp.findOne({ otp: otp });
    }

    const otppayload = { email, otp };
    const otpBody = await Otp.create(otppayload);
    console.log(otpBody);

    const emailBody = emailVerificationRes(otp);
    mailsender(email, "Your otp", emailBody);

    return respond(res, "Otp send successfully", 200, true, otp);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return respond(
      res,
      "Something went wrong while sending the Otp",
      500,
      false
    );
  }
};

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      accountType,
      city,
      pincode,
      state,
      address,
      password,
      confirmPassword,
      otp,
    } = req.body;

    if (
      !firstName||
      !lastName ||
      !address ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !state ||
      !city ||
      !pincode || !accountType
    ) {
      return respond(res, "All fields are required while signup", 400, false);
    }

    console.log("password:",password )
    console.log("confirm:",confirmPassword)

    if (password !== confirmPassword) {
      return respond(res, "Passwords do not Match", 400, false);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return respond(res, "User is already exist", 400, false);
    }

    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    if (recentOtp.length === 0) {
      // OTP not found for the email
      return respond(res, "Otp not found", 400, false);
    } else if (otp !== recentOtp[0].otp) {
      // Invalid OTP
      return respond(res, "Invalid Otp", 400, false);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let vendorDetails;
    let profile;

    if (accountType === "Vendor") {
      vendorDetails = await Vendor.create({
        gstNumber: null,
        gstInvoice: null,
        shopName: null,
      });
    } 

      profile = await Profile.create({
        contactNumber: null,
        dateOfBirth: null,
        gender: null,
      });
    
    const user = await User.create({
      firstName:firstName,
      lastName:lastName,
      email:email,
      accountType,
      city:city,
      pincode:pincode,
      state:state,
      address:address,
      password:hashPassword,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
      profile: profile,
      vendorDetails: accountType === "Vendor" ? vendorDetails._id : undefined,
    });
    
    return respond(res, "User is registerd Successfully", 200, true,user);
  } catch (error) {
    console.log(error);
    return respond(res, "Something went wrong while singup", 500, false);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return respond(res, "All fields are required", 403, false);
    }

    // Find the user by email and populate profile
    const user = await User.findOne({ email }).populate("profile");

    // Check if user exists
    if (!user) {
      return respond(res, "User is not registered. Please sign up first.", 404, false);
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return respond(res, "Password is incorrect", 401, false);
    }

    // Generate token payload
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
      city: user.city,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "240h" });

    // Store token and remove password from user object for security
    user.token = token;
    user.password = undefined;

    // Define cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 2 * 60 * 60 * 1000), // 6 hours expiration
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    };

    // Set cookie and respond
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });

  } catch (error) {
    console.error("Login Error: ", error);
    return respond(res, "Login failed. Please try again.", 500, false);
  }
};