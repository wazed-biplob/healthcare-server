import { adminRouts } from "./app/modules/Admin/admin.route";
import { userRouter } from "./app/modules/User/user.route";

import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1/admin", adminRouts);

export default app;
