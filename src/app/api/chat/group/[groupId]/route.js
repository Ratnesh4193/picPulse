import { connect } from "../../../../../config/dbConfig";
import { Group, Message } from "../../../../../models/chatSchema";
import { decodeToken } from "../../../../../utils/generateToken";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
  try {
    const { groupId } = params;

    const group = await Group.findById(groupId);

    if (!group) {
      throw new Error("Group not found.");
    }

    const response = NextResponse.json({
      message: "Group found successfully.",
      data: group,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
