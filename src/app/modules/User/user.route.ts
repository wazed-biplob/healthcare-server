import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { validateAdmin, verifyToken } from "../utils/functions";

import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  validateAdmin(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.createAdmin
);

export const userRoutes = router;
