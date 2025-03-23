import {  Document, Types} from 'mongoose';
import { ICategory } from './category.interface';

export interface INote {
  _id: Types.ObjectId;
    title: string;
    content: string;
    category: Types.ObjectId | ICategory;
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface INoteDocument extends INote, Document {
    _id: Types.ObjectId;
  }