import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next({ status: 404, message: error.message, stack: error.stack });
}

type CustomError = {
  status: number;
  message: string;
  stack: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = err.status !== 200 ? err.status : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
