import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import { GenerateOTPRequestI, GetLoginPageQueryStringI, VerifyOtpRequestI } from "../types/types";

export default async (app: FastifyInstance) => {
  const authController = container.resolve<AuthController>(AuthController)

  ApiHelper.get<GetLoginPageQueryStringI, {}, {}>(
    app,
    "/",
    authController.getLoginPage.bind(authController)
  );

  ApiHelper.post<GenerateOTPRequestI, {}, {}, {}>(
    app,
    "/generateOtp",
    authController.generateOtp.bind(authController)
  );

  ApiHelper.post<VerifyOtpRequestI, {}, {}, {}>(
    app,
    "/verifyOtp",
    authController.verifyOtp.bind(authController)
  );
};
