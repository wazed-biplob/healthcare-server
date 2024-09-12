import { PrismaClient } from "@prisma/client";
import { query, Request, Response } from "express";
import { adminServices } from "./admin.service";
import { pick } from "../utils/functions";
import { adminQueryData } from "../utils/constants";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAllAdmin(req.query);
    res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
      data: e,
    });
  }
};

export const adminController = {
  getAllAdmin,
};
