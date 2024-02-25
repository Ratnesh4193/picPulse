import { connect } from "../../../../../config/dbConfig";
import { Group, Message } from "../../../../../models/chatSchema";
import User from "../../../../../models/userSchema";
import { decodeToken } from "../../../../../utils/generateToken";
import { NextResponse } from "next/server";

connect();

export async function PUT(request) {
  try {
    const reqBody = await request.json();
    const { groupId, participants } = reqBody;

    const token = request.cookies.get("token")?.value || "";
    const user = decodeToken(token);
    const userId = user.id._id;

    const group = await Group.findOne({
      _id: groupId,
      admins: userId,
      admins: { $nin: participants },
      participants: { $all: participants },
    });

    if (!group) {
      throw new Error(
        "Group not found or you are not the admin or given participants are either admins or some participants are admins of the group."
      );
    }

    group["participants"] = group["participants"].filter(
      (participant) => !participants.includes(participant.toString())
    );
    await group.save();

    const updatedUsers = participants.map(async (participant) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: participant },
        { $pull: { chatGroups: group._id } },
        { new: true } // Return the updated document
      );
      return updatedUser;
    });

    const response = NextResponse.json({
      message: "Participants removed from the group successfully.",
      data: group,
      users: updatedUsers,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
