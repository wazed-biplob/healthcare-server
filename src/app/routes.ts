import express from "express";
import { userRouter } from "./modules/User/user.route";
import { adminRouts } from "./modules/Admin/admin.route";

export const router = express.Router();

export const routes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/admin",
    route: adminRouts,
  },
];
routes.forEach((route) => router.use(route.path, route.route));
