import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import UserChip from "../UserChip/UserChip";
import ChatUserHeader from "./ChatUserHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../lib/features/usersSlice";
import { getLoggedUser } from "../../../lib/features/mainSlice";
import { createGroup } from "../../../lib/features/chatSlice";

const NewChatModal = ({ isOpen, onOpen, onClose, user }) => {
  const curUser = useSelector(getLoggedUser);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userSearchText, setUserSearchText] = useState("");
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();

  const users = useSelector(getUsersList);

  const filteredUsers = (users, searchText) => {
    return users.filter((user) => {
      return (
        curUser !== user._id &&
        !selectedUsers.includes(user) &&
        (user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()))
      );
    });
  };

  const handleAddSelectedUsers = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setUserSearchText("");
  };
  const handleRemoveSelectedUser = (userToRemove) => {
    setSelectedUsers((prev) => {
      return prev.filter((user) => user !== userToRemove);
    });
  };
  const handleStartChat = () => {
    if (selectedUsers.length === 0 || groupName === "") return;
    const participants = selectedUsers.map((user) => user._id);
    dispatch(createGroup({ participants, name: groupName }));
    onClose();
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-gray-700 text-white"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
              New Chat Room
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center w-full mb-4">
                <label htmlFor="groupName" className="w-1/4">
                  Group Name:
                </label>
                <input
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  type="text"
                  placeholder="Type here..."
                  className="bg-transparent rounded-lg py-2 px-4 w-3/4 border-transparent focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex flex-wrap border-y-1 border-gray-600 mb-4">
                <div className="flex items-center justify-center w-1/4">
                  To:
                </div>
                <div className="pl-2 flex items-center justify-start flex-wrap w-3/4">
                  {selectedUsers.map((selectedUser) => (
                    <UserChip
                      key={selectedUser.id}
                      user={selectedUser}
                      handleClose={handleRemoveSelectedUser}
                    />
                  ))}
                  <input
                    value={userSearchText}
                    onChange={(e) => setUserSearchText(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent rounded-lg py-2 px-4 w-full sm:w-48 border-transparent focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="h-40 overflow-auto no-scrollbar mb-4">
                {filteredUsers(users, userSearchText).length &&
                userSearchText !== "" ? (
                  filteredUsers(users, userSearchText).map((user) => (
                    <ChatUserHeader
                      key={user.id}
                      user={user}
                      onClick={() => handleAddSelectedUsers(user)}
                    />
                  ))
                ) : (
                  <div className="text-gray-400">No users found.</div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                className="w-full"
                onClick={handleStartChat}
              >
                Start Chat
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewChatModal;
