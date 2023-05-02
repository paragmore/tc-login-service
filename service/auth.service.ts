import { addMinutes } from "date-fns";
import { injectable } from "inversify";
import { OTPModel } from "../models/otp.model";
import { USER_TYPE } from "../types/types";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class AuthService {
  constructor() {}
  getLoginPage() {
    return `<html>
    <head>
      <title>Login</title>
    </head>
    <body>
      <form method="POST" action="/login">
        <label for="phone">Phone number:</label>
        <input type="text" id="phone" name="phone"><br><br>
        <button type="submit">Generate OTP</button>
      </form>
    </body>
  </html>`;
  }

  generateEasyOTP(length: number): string {
    const easyChars = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += easyChars.charAt(Math.floor(Math.random() * easyChars.length));
    }
    return otp;
  }

  validatePhoneNumber(phone: string) {
    return /^([0]|\+91|91|\+91-|91-)?[123456789]\d{9}$/.test(phone);
  }

  async generateOtp(phoneNumber: string, userType: USER_TYPE) {
    try {
      const validatedNumber = this.validatePhoneNumber(phoneNumber);
      if (!validatedNumber) {
        return;
      }
      const otp = await OTPModel.findOne({ phoneNumber: phoneNumber }).sort({
        createdAt: -1,
      });
      console.log('otp', otp)
      const newOtp = this.generateEasyOTP(4);
      if (!otp) {
        const otpDocument = new OTPModel({
          phoneNumber: phoneNumber,
          otp: newOtp,
          type: "login",
          expiresAt: addMinutes(new Date(), 5),
          attempts: 0,
          locked: false,
        });
        await otpDocument.save();
      } else {
        console.log(addMinutes(otp.updatedAt, 5).toUTCString(), new Date().toUTCString(), otp.updatedAt.toUTCString(), addMinutes(otp.updatedAt, 5) > new Date() )
        if (addMinutes(otp.updatedAt, 5) > new Date() && otp.attempts >= 3) {
          return new ApiError('Too frequent calls, Please try again later', 400);
        }
        await OTPModel.updateOne(
          { _id: otp._id },
          { attempts: otp.attempts + 1, otp: newOtp }
        );
      }
    } catch (error) {
      console.log(error);
      return new ApiError('Some error catched. Please try again.', 500)
    }
  }
}
