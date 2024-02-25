import { connect } from "../../../../../config/dbConfig";
import { Group } from "../../../../../models/chatSchema";
import User from "../../../../../models/userSchema";
import { decodeToken } from "../../../../../utils/generateToken";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, participants } = reqBody;
    const admins = [];
    const token = request.cookies.get("token")?.value || "";
    const user = decodeToken(token);

    const userId = user.id._id;

    participants.push(userId);
    admins.push(userId);

    const newGroup = new Group({
      name,
      participants,
      admins,
    });
    await newGroup.save();

    const updatedParticipants = await Promise.all(
      participants.map(async (participant) => {
        try {
          const userFound = await User.findById(participant);

          if (!userFound) {
            throw new Error("User not found");
          }

          const update = userFound.chatGroups
            ? { $addToSet: { chatGroups: newGroup._id } }
            : { $set: { chatGroups: [newGroup._id] } };

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

    const response = NextResponse.json({
      message: "Group created successfully.",
      data: newGroup,
      users: updatedParticipants,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
