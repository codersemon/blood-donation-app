// dependencies
import mongoose from "mongoose";

// create schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password required!"],
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      default: null,
      trim: true,
    },
    bloodGroup: {
      type: String,
      default: null,
      trim: true,
    },
    profession: {
      type: String,
      default: null,
      trim: true,
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    lastDonation: {
      type: String,
      default: null,
      trim: true,
    },
    gallery: {
      type: [String],
    },
    role: {
      type: String,
      default: "patient",
      enum: ["patient", "donor", "admin"],
    },
    accessToken: {
      type: String,
      trim: true,
      default: null,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// export model
export default mongoose.model("User", userSchema);
