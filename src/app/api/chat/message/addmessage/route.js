import { NextResponse } from "next/server";
import { decodeToken } from "../../../../../utils/generateToken";
import { Group, Message } from "../../../../../models/chatSchema";
import { connect } from "../../../../../config/dbConfig";
import { pusherServer } from "../../../../../config/pusherConfig";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { groupId, message } = reqBody;

    const token = request.cookies.get("token")?.value || "";
    const user = decodeToken(token);
    const userId = user.id._id;

    const msgContent = {
      groupId,
      message,
      sender: userId,
    };
    const date = new Date();
    const mongoDateStr = date.toISOString();
    pusherServer.trigger("messages", "inserted", {
      ...msgContent,
      createdAt: mongoDateStr,
    });

    const group = await Group.findOne({
      _id: groupId,
      participants: userId,
    });

    if (!group) {
      throw new Error(
        "Group not found or you are not a participant of the group."
      );
    }

    const newMessage = await Message(msgContent);
    await newMessage.save();

    const response = NextResponse.json({
      message: "Message posted successfully",
      data: newMessage,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
