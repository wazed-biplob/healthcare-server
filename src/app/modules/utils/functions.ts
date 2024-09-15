import { Response } from "express";
import { ResponseResult } from "./types";

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
