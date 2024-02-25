import { Avatar } from "@nextui-org/react";
import React from "react";

const ChatUserHeader = ({ user, onClick = () => {} }) => {
  const { username, name, email } = user;

  return (
    user && (
      <div
        className="flex items-center p-1 my-1 text-md rounded-md hover:bg-slate-900 hover:cursor-pointer"
        onClick={onClick}
      >
        <div className="p-1">
          <Avatar src={user.profilePic} size="sm" />
        </div>
        <div className="p-1 text-xs">
          <div className="font-bold">{username}</div>
          <div className="font-semibold text-default-400 ">{name}</div>
        </div>
      </div>
    )
  );
};

export default ChatUserHeader;
