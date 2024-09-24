import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";

import { adminUpdateSchema } from "../utils/constants";
import { UserRole } from "@prisma/client";
import { validateUpdateAdmin, validateUserRole } from "../utils/functions";
const router = express.Router();

router.get(
  "/",
  validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAllAdmin
);
router.get(
  "/:id",
  validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAdminById
);
router.patch(
  "/:id",
  validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateUpdateAdmin(adminUpdateSchema),
  adminController.updateAdminById
);
router.delete(
  "/:id",
  validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.deleteAdminById
);

export const adminRoutes = router;
