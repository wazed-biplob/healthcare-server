import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ResponseResult } from "./types";
import { AnyZodObject } from "zod";

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const SendResponse = <T>(res: Response, result: ResponseResult<T>) => {
  res.status(result.statusCode).json({
    success: result.success,
    statusCode: result.statusCode,
    message: result.message,
    data: result.data,
  });
};

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((e) => next(e));
  };
};

// zod validations
export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
      next();
    } catch (e) {
      next(e);
    }
  };

export const generateToken = (jwtPayload: any, key: string, extra: any) => {
  return jwt.sign(jwtPayload, key, extra);
};

export const verifyToken = (token: string, key: Secret) => {
  return jwt.verify(token, key) as JwtPayload;
};
