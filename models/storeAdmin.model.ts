import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  attempts: { type: Number, default: 0 },
  locked: { type: Boolean, default: false },
});

export const OTPModel = mongoose.model("StoreAdmin", otpSchema);
