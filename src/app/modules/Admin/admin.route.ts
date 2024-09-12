import { PrismaClient } from "@prisma/client";
import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAllAdmin);

export const adminRouts = router;
