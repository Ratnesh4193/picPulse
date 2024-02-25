import React from "react";
import { useSelector } from "react-redux";
import { getActiveChatGroup } from "../../../lib/features/chatSlice";
import ChatRoomSelectedScreen from "./ChatRoomSelectedScreen";
import NoChatRoomSelectedScreen from "./NoChatRoomSelectedScreen";

const ChatWindow = () => {
  const activeChatGroupId = useSelector(getActiveChatGroup);
  return (
    <div className="flex flex-col h-full">
      {activeChatGroupId !== "" ? (
        <ChatRoomSelectedScreen groupId={activeChatGroupId} />
      ) : (
        <NoChatRoomSelectedScreen />
      )}
    </div>
  );
};

export default ChatWindow;
