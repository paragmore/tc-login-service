import { inject, injectable } from "inversify";
import path from "path";
import { AuthService } from "../service/auth.service";
import {
  GenerateOTPRequestI,
  USER_TYPE,
  VerifyOtpRequestI,
} from "../types/types";
import {
  ApiError,
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";
import ejs from "ejs";

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}
  getLoginPage: ApiHelperHandler<{}, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    const loginPage = this.authService.getLoginPage();
    const filePath = path.join(__dirname, "..", "../public", "login.ejs");
    console.log(filePath);
    reply.type("text/html");
    return ejs.renderFile(filePath);
  };

  generateOtp: ApiHelperHandler<GenerateOTPRequestI, {}, {}, {}, IReply> =
    async (request, reply) => {
      const { body } = request;
      console.log(body);
      console.log(body?.phoneNumber);
      if (!body?.phoneNumber || !body.userType) {
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
      return ApiHelper.success(reply, {});
    };

  verifyOtp: ApiHelperHandler<VerifyOtpRequestI, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    const { body } = request;
    if (!body?.phoneNumber || !body.otp || !body.userType) {
      return ApiHelper.missingParameters(reply);
    }
    if (body.userType !== USER_TYPE.SUPER_ADMIN && !body.storeId) {
      return ApiHelper.missingParameters(reply);
    }
    const isCorrectOtp = await this.authService.verifyOtp(
      body.phoneNumber,
      body.otp,
      body.userType,
      body.storeId
    );
    if (!isCorrectOtp) {
      return ApiHelper.callFailed(reply, "Please enter correct otp", 400);
    }
    return ApiHelper.success(reply, isCorrectOtp);
  };
}
