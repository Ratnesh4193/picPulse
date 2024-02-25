import React, { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../lib/features/chatSlice";

const ChatTextInputBox = ({ groupId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleSendMessage = () => {
    dispatch(sendMessage({ message, groupId }));
    setMessage("");
  };
  return (
    <div className="flex items-center mx-auto w-full p-2">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full flex-grow">
        <div className=" text-3xl absolute inset-y-0 start-0 flex items-center ps-1 pointer-events-none">
          <MdEmojiEmotions color="black" />
        </div>
        <input
          type="text"
          id="chat-input"
          value={message}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type here..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
      </div>
      <button
        onClick={handleSendMessage}
        className="p-2.5 ms-2 text-xl font-medium text-white bg-transparent rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <IoMdSend />
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default ChatTextInputBox;
