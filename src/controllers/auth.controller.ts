
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import * as authService from "../services/auth.service";

/**
 * Register a new user
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = await authService.registerUser (req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
      user,
    });
  } catch (error: any) {
    console.error("Registration Error:", error.message);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

/**
 * Login user and return JWT
 */
export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body; 
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    const err = error as { message: string };
    const message = err.message.includes('Invalid email') 
      ? 'Account not found' 
      : err.message.includes('Invalid password') 
        ? 'Incorrect password' 
        : 'Authentication failed';
  
    res.status(401).json({ 
      status: 'error',
      message
    });
  };
};

/**
 * Check if password matches hashed password
 */
export const checkPassword: RequestHandler = async (req, res) => {
  const { plainPassword, hashedPassword } = req.body;
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  res.json({ match });
}

/**
 * Reset user password
 */
export const resetPassword: RequestHandler = async (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  await User.updateOne(
    { email }, 
    { $set: { password: hashedPassword } }
  );  
  res.json({ message: 'Password updated successfully' });
}