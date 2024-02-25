import { NextResponse } from "next/server";
import Post from "../../../../models/postSchema";
import User from "../../../../models/userSchema";
import { decodeToken } from "../../../../utils/generateToken";

export async function POST(request) {
  const reqBody = await request.json();
  const { caption, url } = reqBody;
  const token = request.cookies.get("token")?.value || "";
  const tokenObj = decodeToken(token);
  const userId = tokenObj._id;

  const resize_url = url.replace("upload/", "upload/w_1080,h_1080,c_scale/");
  try {
    const post = new Post({
      caption,
      photo: resize_url,
      postedBy: userId,
    });
    await post.save();

    await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
