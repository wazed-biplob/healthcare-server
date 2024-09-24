import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import { validateAdmin, validateRequest } from "../utils/functions";
import { adminUpdateSchema } from "../utils/constants";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get(
  "/",
  validateAdmin(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAllAdmin
);
router.get(
  "/:id",
  validateAdmin(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAdminById
);
router.patch(
  "/:id",
  validateAdmin(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(adminUpdateSchema),
  adminController.updateAdminById
);
router.delete(
  "/:id",
  validateAdmin(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.deleteAdminById
);

export const adminRoutes = router;
