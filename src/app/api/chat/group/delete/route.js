import { connect } from "../../../../../config/dbConfig";
import { Group, Message } from "../../../../../models/chatSchema";
import User from "../../../../../models/userSchema";
import { decodeToken } from "../../../../../utils/generateToken";
import { NextResponse } from "next/server";

connect();

export async function DELETE(request) {
  try {
    const reqBody = await request.json();
    const { groupId } = reqBody;
    const token = request.cookies.get("token")?.value || "";
    const user = decodeToken(token);
    const userId = user.id._id;

    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group not found.");
    }
    const updatedParticipants = await Promise.all(
      group.participants.map(async (participant) => {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: participant },
            { $pull: { chatGroups: group._id } },
            { new: true } // Return the updated document
          );

          return updatedUser;
        } catch (error) {
          console.error("Error updating participant:", error);
          throw error;
        }
      })
    );

    await Group.findOneAndDelete({ _id: groupId, admins: userId });

    const response = NextResponse.json({
      message: "Group deleted successfully.",
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
