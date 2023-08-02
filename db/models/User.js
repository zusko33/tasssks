import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  githubId: { type: String },
  tasks: { type: [Schema.Types.ObjectId], ref: "Task" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
