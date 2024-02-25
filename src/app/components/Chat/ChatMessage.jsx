import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../lib/features/usersSlice";
import Link from "next/link";
import { Avatar } from "flowbite-react";
import { formatChatTimestamp } from "../../../utils/utils";

const ChatMessage = ({
  chat = {
    sender: "65cd42c641e82348c044acc7",
    message: "Sample Message",
    createdAt: new Date().toISOString(),
  },
}) => {
  const { sender: senderId, message, createdAt } = chat;

  const senderUser = useSelector(getUser(senderId));
  const curUserId = useSelector((state) => state.main.userId);
  const curUser = useSelector(getUser(curUserId));

  const isSender = curUser?._id === senderUser?._id;
  return (
    <div
      className={`flex items-start ${
        isSender ? "justify-end" : "justify-start"
      } gap-2.5 p-6`}
    >
      <Link href={`/profile/${senderUser._id}`} className="p-2 ">
        <Avatar src={senderUser.profilePic} size="md" />
      </Link>
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
          isSender ? "bg-emerald-800" : "bg-slate-900"
        } rounded-e-xl rounded-es-xl dark:bg-gray-700`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-white dark:text-white">
            {senderUser.username}
          </span>
          <span className="text-sm font-normal text-slate-500 dark:text-gray-400">
            {formatChatTimestamp(new Date(createdAt))}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-white dark:text-white">
          {message}
        </p>
        {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span> */}
      </div>
    </div>
  );
};

export default ChatMessage;
