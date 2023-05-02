import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const OTPModel = mongoose.model("OTP", otpSchema);
