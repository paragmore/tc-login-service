import { addMinutes } from "date-fns";
import { inject, injectable } from "inversify";
import { OTPModel } from "../models/otp.model";
import { AuthRepo } from "../repo/auth.repo";
import { USER_TYPE } from "../types/types";
import { ApiError } from "../utils/ApiHelper";
import ejs from "ejs";
import mustache from "mustache";
import path from "path";
import jwt from "jsonwebtoken";

@injectable()
export class AuthService {
  constructor(@inject(AuthRepo) private authRepo: AuthRepo) {}

  async getLoginPage(storeId: string, userType: USER_TYPE) {
    const filePath = path.join(__dirname, "..", "../public", "login.html");
    console.log(filePath);
    const stringRender = await ejs.renderFile(filePath);
    const rendered = mustache.render(stringRender, {
      storeId: storeId,
      userType: userType,
    });
    return rendered;
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
      console.log("otp", otp);
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
        console.log(
          addMinutes(otp.updatedAt, 5).toUTCString(),
          new Date().toUTCString(),
          otp.updatedAt.toUTCString(),
          addMinutes(otp.updatedAt, 5) > new Date()
        );
        if (addMinutes(otp.updatedAt, 5) > new Date() && otp.attempts >= 3) {
          return new ApiError(
            "Too frequent calls, Please try again later",
            400
          );
        }
        await OTPModel.updateOne(
          { _id: otp._id },
          { attempts: otp.attempts + 1, otp: newOtp }
        );
      }
    } catch (error) {
      console.log(error);
      return new ApiError("Some error catched. Please try again.", 500);
    }
  }

  async verifyOtp(
    phoneNumber: string,
    otp: string,
    userType: USER_TYPE,
    storeId: string | undefined
  ) {
    const storedOtp = await OTPModel.findOne({ phoneNumber }).sort({
      createdAt: -1,
    });

    if (
      storedOtp &&
      storedOtp?.otp === otp &&
      storedOtp.expiresAt > new Date()
    ) {
      if (userType === USER_TYPE.CUSTOMER && storeId) {
        const customer = await this.authRepo.getOrCreateCustomerByPhone(
          phoneNumber,
          storeId
        );
        if (customer instanceof ApiError) {
          return customer;
        }
        if (!process.env.JWT_SECRET) {
          return new ApiError(
            "Error in AuthService: verifyOtp => JWT_SECRET not found",
            500
          );
        }
        const refreshToken = jwt.sign(
          { customerId: customer.id, storeId: customer.storeId },
          process.env.JWT_SECRET,
          { expiresIn: "72h" }
        );
        const accessToken = jwt.sign(
          { customerId: customer.id, storeId: customer.storeId },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return { refreshToken, accessToken };
      }
    }
    return new ApiError('Please enter correct OTP', 400);
  }
}
