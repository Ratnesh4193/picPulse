import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatTextInputBox from "./ChatTextInputBox";
import {
  fetchChatByGroupId,
  selectChatsByGroupIdWithFetch,
} from "../../../lib/features/chatSlice";

const ChatRoomSelectedScreen = ({ groupId }) => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const chatsByGroupId = useSelector(selectChatsByGroupIdWithFetch(groupId));
  useEffect(() => {
    if (!chatsByGroupId && groupId) {
      dispatch(fetchChatByGroupId(groupId));
    }
  }, [groupId, chatsByGroupId, dispatch]);
  useEffect(() => {
    scrollToBottom();
  }, [chatsByGroupId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    groupId && (
      <>
        <div className="h-[90vh] overflow-auto no-scrollbar">
          {chatsByGroupId?.map((chatMessage) => {
            return <ChatMessage key={chatMessage._id} chat={chatMessage} />;
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-[10vh]">
          <ChatTextInputBox groupId={groupId} />
        </div>
      </>
    )
  );
};

export default ChatRoomSelectedScreen;
