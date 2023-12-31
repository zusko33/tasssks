import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  memberName: { type: String },
  avatar: { type: String },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
