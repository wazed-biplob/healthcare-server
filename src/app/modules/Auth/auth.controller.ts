import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import { catchAsync, SendResponse } from "../utils/functions";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, { secure: false, httpOnly: true });
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
