import { Request, Response, NextFunction } from 'express';
import { idParamSchema } from "../validations/category.validation";

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = idParamSchema.validate({ id: req.params.id });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return Promise.resolve();
  }

  next();
  return Promise.resolve();
};

