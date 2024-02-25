import { connect } from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import User from "../../../../models/userSchema";
import Post from "../../../../models/postSchema";

export async function POST(request, { params }) {
  try {
    await connect();
    const reqBody = await request.json();
    const { unFollowId, userId } = reqBody;

    const updatedFollowee = await User.findByIdAndUpdate(
      unFollowId,
      {
        $pull: { followers: userId },
      },
      {
        new: true,
      }
    );

    const updatedFollower = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { following: unFollowId },
      },
      {
        new: true,
      }
    );
    return NextResponse.json({ updatedFollower, updatedFollowee });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
