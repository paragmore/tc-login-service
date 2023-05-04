import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    otp: { type: String },
    expiresAt: { type: Date },
    attempts: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const OTPModel = mongoose.model("StoreAdmin", otpSchema);
