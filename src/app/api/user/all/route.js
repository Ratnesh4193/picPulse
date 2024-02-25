import { connect } from "../../../../config/dbConfig";
import { NextResponse } from "next/server";
import User from "../../../../models/userSchema";
import Post from "../../../../models/postSchema";

connect();
export async function GET(request) {
  try {
    const users = await User.find().select("-password -__v").populate("posts");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
