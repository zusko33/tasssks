import mongoose from "mongoose";
const { Schema } = mongoose;

const memberSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String },
});

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
