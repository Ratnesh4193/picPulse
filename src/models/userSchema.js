import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJETLjaeEGteeWMrEWSlfslFi1A0v2TDXoEg&usqp=CAU",
  },
  resetToken: String,
  expireToken: Date,
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
  posts: [{ type: ObjectId, ref: "Post" }],
  chatGroups: [{ type: ObjectId, ref: "Group" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
