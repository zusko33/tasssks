import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
