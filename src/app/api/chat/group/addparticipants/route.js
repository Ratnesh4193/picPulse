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
      participants: { $nin: participants },
    });
    if (!group) {
      throw new Error(
        "Group not found or you are not the admin or some new participants are already participants of the group."
      );
    }

    const updatedParticipants = await Promise.all(
      participants.map(async (participant) => {
        try {
          const userFound = await User.findById(participant);

          if (!userFound) {
            throw new Error("User not found");
          }

          const update = userFound.chatGroups
            ? { $addToSet: { chatGroups: groupId } }
            : { $set: { chatGroups: [groupId] } };

          const updatedUser = await User.findByIdAndUpdate(
            participant,
            update,
            {
              new: true,
            }
          );

          return updatedUser;
        } catch (error) {
          console.error("Error updating participant:", error);
          throw error;
        }
      })
    );

    group["participants"] = [...group["participants"], ...participants];
    await group.save();

    const response = NextResponse.json({
      message: "Participants added to group successfully.",
      group,
      users: updatedParticipants,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
