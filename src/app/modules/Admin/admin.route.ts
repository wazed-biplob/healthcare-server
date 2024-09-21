import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import { validateRequest } from "../utils/functions";
import { adminUpdateSchema } from "../utils/constants";
const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getAdminById);
router.patch(
  "/:id",
  validateRequest(adminUpdateSchema),
  adminController.updateAdminById
);
router.delete("/:id", adminController.deleteAdminById);

export const adminRoutes = router;
