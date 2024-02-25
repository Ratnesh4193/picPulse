"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser, toggleSideBar } from "../../lib/features/mainSlice";
import ChatWindow from "../components/Chat/ChatWindow";
import NewChatModal from "../components/Chat/NewChatModal";
import ChatGroupList from "../components/Chat/ChatGroupList";
import { FaPenToSquare } from "react-icons/fa6";
import { getUser } from "../../lib/features/usersSlice";
import { useDisclosure } from "@nextui-org/react";
import { pusherClient } from "../../config/pusherConfig";
import { addMessage } from "../../lib/features/chatSlice";

const page = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getLoggedUser);
  const user = useSelector(getUser(userId));
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(toggleSideBar(false));
    return () => {
      dispatch(toggleSideBar(true));
    };
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe("messages");
    channel.bind("inserted", async (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return !user ? (
    "Loading..."
  ) : (
    <div className="w-full min-h-screen bg-black text-white flex">
      <div className="w-3/12 border-r-1 border-slate-700 ">
        <div className="p-5 h-[10vh] flex text-2xl items-center justify-around">
          <span className="font-semibold">{user.username}</span>
          <NewChatModal
            user={user}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <button>
            <FaPenToSquare
              onClick={() => {
                onOpen();
              }}
            />
          </button>
        </div>
        <div className="p-5 w-full h-[90vh] overflow-auto no-scrollbar">
          <ChatGroupList />
        </div>
      </div>
      <div className="w-9/12 justify-center min-h-screen overflow-auto no-scrollbar">
        <ChatWindow />
      </div>
    </div>
  );
};

export default page;
