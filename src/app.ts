import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/modules/utils/globalErrorHandler";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);


app.use(globalErrorHandler);

app.use("/", (req, res) => {});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "API not found!",
    error: {
      path: req.originalUrl,
      message: `No such url found!`,
    },
  });
});

export default app;
