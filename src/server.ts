import dotenv from "dotenv";
dotenv.config();


import { connectDB } from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 8080;

const start = async () => {
    try {
      connectDB();
  app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  };
  
  start();