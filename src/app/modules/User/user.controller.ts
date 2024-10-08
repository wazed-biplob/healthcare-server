import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.createAdmin(req);

    res.status(200).json({
      success: true,
      message: "Admin has been created",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message || "Something went wrong",
      error: e,
    });
  }
};


const createDoctor = async (req: Request, res: Response) => {
  try {
    const result = await userService.createDoctor(req);

    res.status(200).json({
      success: true,
      message: "Doctor has been created",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message || "Something went wrong",
      error: e,
    });
  }
};

export const userController = {
  createAdmin,
  createDoctor
};
