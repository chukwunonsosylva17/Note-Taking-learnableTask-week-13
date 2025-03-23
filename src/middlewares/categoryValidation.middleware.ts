import { Request, Response, NextFunction } from "express";
import { categoryValidationSchema } from "../validations/category.validation";

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error, value } = categoryValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((detail) => detail.message),
    });
    return; // Explicitly return to prevent further execution
  }

  req.body = value;
  next(); // Ensure next() is always called
};