import express from "express";
import { authController } from "./auth.controller";
import { validateAdmin } from "../utils/functions";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/refreshToken", authController.refreshToken);
router.post(
  "/change-password",
  validateAdmin(
    UserRole.SUPER_ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
    UserRole.ADMIN
  ),
  authController.changePassword
);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
