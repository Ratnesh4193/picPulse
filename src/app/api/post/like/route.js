import { NextResponse } from "next/server";
import Post from "../../../../models/postSchema";
import { decodeToken } from "../../../../utils/generateToken";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { postId } = reqBody;

    const token = request.cookies.get("token")?.value || "";
    const user = decodeToken(token);
    const userId = user.id._id;

    console.log(token, user, userId);

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: userId },
      },
      {
        new: true,
      }
    ).populate("comments.postedBy", "_id name profilePic");

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
