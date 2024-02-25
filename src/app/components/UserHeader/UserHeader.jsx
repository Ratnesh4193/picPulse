import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const defaultUser = {
  email: "defaultuser@gmail.com",
  followers: [],
  following: [],
  name: "Default User",
  posts: [],
  profilePic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJETLjaeEGteeWMrEWSlfslFi1A0v2TDXoEg&usqp=CAU",
  username: "defaultuser",
  _id: "65cd42c641e82348c044acc7",
};

const UserHeader = ({ user = defaultUser }) => {
  const {
    _id,
    name,
    username,
    email,
    profilePic,
    followers,
    following,
    posts,
  } = user;
  return (
    <div className="flex items-center justify-start text-sm w-full">
      <Link href={`/profile/${_id}`} className="p-2 ">
        <Avatar src={profilePic} size="md" />
      </Link>
      <div className="p-2">
        <Link href={`/profile/${_id}`} className="font-bold">
          {username}
        </Link>
        <div className="font-semibold text-default-400 text-small">{name}</div>
      </div>
    </div>
  );
};

export default UserHeader;
