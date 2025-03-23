import { Document, Types} from 'mongoose';

export interface ICategory extends Document {
    _id: Types.ObjectId;
      name: string;
      color: string;
      description: String;
      createdAt: Date;
      updatedAt: Date;
}