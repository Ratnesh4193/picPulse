import React from "react";
import { useSelector } from "react-redux";
import ChatGroupHeader from "./ChatGroupHeader";
import { getLoggedUser } from "../../../lib/features/mainSlice";
import { getUserChatGroups } from "../../../lib/features/usersSlice";

const ChatGroupList = () => {
  const userId = useSelector(getLoggedUser);
  const chatGroupIds = useSelector(getUserChatGroups(userId));

  return (
    <div className="overflow-auto no-scrollbar flex-1">
      {chatGroupIds?.map((chatGroupId) => {
        return <ChatGroupHeader key={chatGroupId} chatGroupId={chatGroupId} />;
      })}
    </div>
  );
};

export default ChatGroupList;
