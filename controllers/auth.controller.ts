import { inject, injectable } from "inversify";
import path from "path";
import { AuthService } from "../service/auth.service";
import { GenerateOTPRequestI } from "../types/types";
import {
  ApiError,
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}
  getLoginPage: ApiHelperHandler<{}, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    const loginPage = this.authService.getLoginPage();
    const filePath = path.join(__dirname, "..", "public", "login.html");
    console.log(filePath);
    reply.redirect("/public/login.html");
  };

  generateOtp: ApiHelperHandler<GenerateOTPRequestI, {}, {}, {}, IReply> =
    async (request, reply) => {
      const { body } = request;
      if (!body?.phoneNumber || !body.phoneNumber) {
        return ApiHelper.missingParameters(
          reply,
          "Phone number or user type missing"
        );
      }
      const generateOtpResponse = await this.authService.generateOtp(
        body.phoneNumber,
        body.userType
      );
      console.log(generateOtpResponse);
      if (generateOtpResponse instanceof ApiError) {
        return ApiHelper.callFailed(
          reply,
          generateOtpResponse.message,
          generateOtpResponse.code
        );
      }
      const filePath = path.join(__dirname, "..", "public", "login.html");
      console.log(filePath);
      reply.redirect("/public/login.html");
    };

  verifyOtp: ApiHelperHandler<{}, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    const loginPage = this.authService.getLoginPage();
    const filePath = path.join(__dirname, "..", "public", "login.html");
    console.log(filePath);
    reply.redirect("/public/login.html");
  };
}
