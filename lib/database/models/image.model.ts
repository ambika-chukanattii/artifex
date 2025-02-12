import { Document, Schema, model, models } from "mongoose";

export interface IImage extends Document {
  title: string;
  prompt?: string;
  transformationType: string;
  selectPrompt?: string;
  originalImage: {
    imageUrl?: string;
    width?: number;
    height?: number;
  },
  transformedImage: {
    imageUrl: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
  },
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
}

const ImageSchema = new Schema({
  title: { type: String, required: true },
  prompt: { type: String },
  transformationType: { type: String, required: true },
  selectPrompt: { type: String },
  originalImage: {
    imageUrl: { type: String },
    width: { type: Number },
    height: { type: Number },
  },
  transformedImage: {
    imageUrl: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    aspectRatio: { type: String },
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;