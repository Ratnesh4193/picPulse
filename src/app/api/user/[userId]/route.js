import { connect } from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import User from "../../../../models/userSchema";
import Post from "../../../../models/postSchema";

connect();

export async function GET(request, { params }) {
  try {
    const { userId } = params;
    const user = await User.findOne({ _id: userId })
      .select("-password")
      .populate("posts");
    if (user === null)
      return NextResponse.json({ msg: "No User found." }, { status: 500 });
    const posts = await Post.find({ postedBy: userId });
    return NextResponse.json({ user, posts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
