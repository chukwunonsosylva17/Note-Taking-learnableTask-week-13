import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Schema for user registration validation
const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().min(6).required(),
});

// Schema for user login validation
const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().required(),
});

// Middleware for validating registration
export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Request body is missing" });
    }

    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ success: false, errors: error.details });
    }

    next();
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Middleware for validating login
export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details });
  }

  next();
};

// Schema for password validation
const passwordSchema = Joi.object({
  plainPassword: Joi.string().trim().required(),
  hashedPassword: Joi.string().trim().required(),
});

// Middleware for validating password
export const passwordValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = passwordSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details });
  }

  next();
};

// Schema for email validation
const emailSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
});

// Middleware for validating email
export const emailValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = emailSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details });
  }

  next();
};