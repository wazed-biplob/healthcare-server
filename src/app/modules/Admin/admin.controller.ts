import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.service";
import { catchAsync, SendResponse } from "../utils/functions";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getAllAdmin(req.query);
  res.status(200).json({
    success: true,
    message: "Admin retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminServices.getAdminById(id);
    res.status(200).json({
      success: true,
      message: "Fetched by Id",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e?.name || "Something went wrong!",
      data: e,
    });
  }
};

const updateAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await adminServices.updateAdminById(id, data);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e?.name || "Something went wrong!",
      data: e,
    });
  }
};

const deleteAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminServices.deleteAdminById(id);

    SendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (e: any) {
    next(e);
  }
};

export const adminController = {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
