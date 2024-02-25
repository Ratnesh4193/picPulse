import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiMagicHat } from "react-icons/gi";
import {
  fetchChatGroupById,
  getUnSeenMsgCountByGroupId,
  selectChatGroupByIdWithFetch,
  setActiveChatGroup,
} from "../../../lib/features/chatSlice";

const ChatGroupHeader = ({ chatGroupId = "65d7b680df71f17ee5e56f34" }) => {
  const dispatch = useDispatch();
  const chatGroup = useSelector(selectChatGroupByIdWithFetch(chatGroupId));
  const unSeenMsgCount = useSelector(getUnSeenMsgCountByGroupId(chatGroupId));

  useEffect(() => {
    if (!chatGroup) {
      dispatch(fetchChatGroupById(chatGroupId));
    }
  }, [chatGroupId, chatGroup, dispatch]);

  if (!chatGroup) {
    return <div>Loading...</div>;
  }

  const handleChatGroupChange = () => {
    dispatch(setActiveChatGroup(chatGroupId));
  };
  return (
    <div
      className="flex items-center p-2 my-4 text-md rounded-md hover:bg-slate-900 hover:cursor-pointer relative"
      onClick={handleChatGroupChange}
    >
      <div className="p-2">
        <GiMagicHat />
      </div>
      <div className="p-2">{chatGroup.name}</div>
      {unSeenMsgCount !== 0 && (
        <span className="top-0 right-0 transform translate-x-2 -translate-y-2 flex items-center justify-center w-4 h-4 bg-white text-black rounded-full">
          {unSeenMsgCount}
        </span>
      )}
    </div>
  );
};

export default ChatGroupHeader;
