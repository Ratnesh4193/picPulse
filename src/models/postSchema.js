import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

var postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    photo: { type: String, required: true },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
        createdAt: Date,
      },
    ],
    postedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
