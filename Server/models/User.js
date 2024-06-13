import mongoose from "mongoose";

const schema = new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      city:{
        required: true,
        type: String,
      },
      pincode: {
        required: true,
        type: Number,
      },
      state: {
        type: String,
        required: true,
      },
      address: {
        required: true,
        type: String,
      },
      password: {
        required: true,
        type: String,
      },
      accountType: {
        // required: true,
        type: String,
        enum: ["Individual", "Vendor","Admin"],
      },
      image: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      resetpasswordexpires: {
        type: Date,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        }
      ],
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required:true
      },
      vendorDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    //   Location: {
    //     type: String,
    //   },
      token: {
        type: String
      }
});

export const User = mongoose.model("User", schema);