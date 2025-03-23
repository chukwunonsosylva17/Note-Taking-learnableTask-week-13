import { Schema, model, Document, Types } from 'mongoose';


export interface Category extends Document {
    _id: Types.ObjectId;
    name: string;
    description: String;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
const categorySchema = new Schema<Category>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: { 
            type: String, 
            required: true 
        },
        color: {
            type: String,
            default: '#ffffff'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

export const Category = model<Category>('Category', categorySchema);
export default Category;