import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

interface UserCredentials {
  username?: string;
  email: string;
  password: string;
}

/**
 * Custom Error Class for better debugging
 */
class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Register a new user
 */
export const registerUser = async (userData: UserCredentials) => {
  const { username, email, password } = userData;

  if (!username || !email || !password) {
    throw new AuthError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AuthError("User already exists. Please log in.", 400);
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });

  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

/**
 * Login user and return JWT token
 */export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Login attempt for email:', email);
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? user.email : 'Not found');

    if (!user) {
      throw  new Error ('No user found with this email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      throw new Error (' Invalid Password');
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    
    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
};

/**
 * Check if password matches hashed password
 */
export const checkPassword = async (plainPassword: string, hashedPassword: string) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}

/**
 * Reset user password
 */
export const resetPassword = async (email: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne(
    { email
    },
    { $set: { password: hashedPassword } }
  );
  return 'Password updated successfully';
}
