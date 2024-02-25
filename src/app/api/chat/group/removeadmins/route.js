import { connect } from "../../../../../config/dbConfig";
import { Group, Message } from "../../../../../models/chatSchema";
import { decodeToken } from "../../../../../utils/generateToken";
import { NextResponse } from "next/server";

connect();

export async function PUT(request) {
  try {
    const reqBody = await request.json();
    const { groupId, admins } = reqBody;

    const token = request.cookies.get("token")?.value || "";
    const user = decodeToken(token);
    const userId = user.id._id;

    const group = await Group.findOne({
      _id: groupId,
      admins: userId,
      admins: { $all: admins },
    });
    if (!group) {
      throw new Error(
        "Group not found or you are not the admin or given admins are not all admins of the group."
      );
    }

    group["admins"] = group["admins"].filter(
      (admin) => !admins.includes(admin.toString())
    );
    await group.save();

    const response = NextResponse.json({
      message: "Admins removed from the group successfully.",
      data: group,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
