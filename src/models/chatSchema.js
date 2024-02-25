import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

var groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    participants: [{ type: ObjectId, ref: "User" }],
    admins: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

var messageSchema = new mongoose.Schema(
  {
    sender: { type: ObjectId, ref: "User" },
    groupId: { type: ObjectId, ref: "Group" },
    message: { type: String, req: "True" },
  },
  { timestamps: true }
);

export const Group =
  mongoose.models.Group || mongoose.model("Group", groupSchema);
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
