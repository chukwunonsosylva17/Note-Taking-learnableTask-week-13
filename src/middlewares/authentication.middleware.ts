import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser, AuthRequest } from "../interfaces/auth.interface";
import User from "../models/user.model";


const JWT_SECRET = process.env.JWT_SECRET;


// Ensure JWT_SECRET exists before starting the server
if (!JWT_SECRET) {
  console.error(" Missing JWT_SECRET in environment variables. Exiting...");
  process.exit(1);
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    if (!token) {
      res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token as string, JWT_SECRET) as unknown as { userId: string };

    if (!decoded?.userId) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (user) {
      req.user = user; // Attach user to request
      next(); // Proceed to next middleware
    } else {
      res.status(401).json({ success: false, message: "User not found" });
    }
    next(); // Proceed to next middleware
  } catch (error: unknown) {
    console.error(" Authentication error:", error);

    let message = "Server error";
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") message = "Token expired";
      if (error.name === "JsonWebTokenError") message = "Invalid token";
    }

    res.status(401).json({ success: false, message });
  }
  next();
};
