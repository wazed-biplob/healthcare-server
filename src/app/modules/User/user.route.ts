import {
  upload,
  validateCreateAdmin,
  validateUserRole,
} from "./../utils/functions";
import express from "express";
import { userController } from "./user.controller";

import { UserRole } from "@prisma/client";
import { createAdminSchema } from "../utils/constants";

const router = express.Router();

router.post(
  "/",
  // validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  async (req, res) => {
    req.body = createAdminSchema.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res);
  }
);

export const userRoutes = router;
