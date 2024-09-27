import {
  upload,
  validateCreateAdmin,
  validateUserRole,
} from "./../utils/functions";
import express from "express";
import { userController } from "./user.controller";

import { UserRole } from "@prisma/client";
import { createAdminSchema, createDoctorSchema } from "../utils/constants";

const router = express.Router();

router.post(
  "/create-admin", 
  // validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single('file'),
  async (req, res) => {    
    req.body = createAdminSchema.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res);
  }
);

router.post(
  "/create-doctor", 
  // validateUserRole(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single('file'),
  async (req, res) => {    
    req.body = await createDoctorSchema.parse(JSON.parse(req.body.data));
    return userController.createDoctor(req, res);
  }
);

export const userRoutes = router;
