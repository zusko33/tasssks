import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
