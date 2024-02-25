import { connect } from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import User from "../../../../models/userSchema";

export async function POST(request, { params }) {
  try {
    await connect();
    const reqBody = await request.json();
    const { followeeId, userId } = reqBody;

    const updatedFollowee = await User.findByIdAndUpdate(
      followeeId,
      {
        $push: { followers: userId },
      },
      {
        new: true,
      }
    );

    const updatedFollower = await User.findByIdAndUpdate(
      userId,
      {
        $push: { following: followeeId },
      },
      {
        new: true,
      }
    ).select("-password");
    return NextResponse.json({ updatedFollower, updatedFollowee });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
