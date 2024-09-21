import express from "express";
import { userRoutes } from "./modules/User/user.route";
import { adminRoutes } from "./modules/Admin/admin.route";
import { authRoutes } from "./modules/Auth/auth.route";

export const router = express.Router();

export const routes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  { path: "/auth", route: authRoutes },
];
routes.forEach((route) => router.use(route.path, route.route));
