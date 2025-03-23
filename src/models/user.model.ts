import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { CallbackError } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); //  Only hash if password is new/modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error(" Password hashing error:", error);
    return next(error as CallbackError); //  Properly pass error to Mongoose
  }
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error(" Password comparison error:", error);
    return false;
  }
};

//  

export default model<IUser>("User", UserSchema);