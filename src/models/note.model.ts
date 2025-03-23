import { Schema, model, Document, Types } from 'mongoose';

export interface Note extends Document {
    _id: Types.ObjectId;
    title: string;
    content: string;
    category: Types.ObjectId;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  
const noteSchema = new Schema<Note>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
    {
        timestamps: true,
        versionKey: false
    },

);

const Note = model<Note>('Note', noteSchema);

export default Note;
