import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;