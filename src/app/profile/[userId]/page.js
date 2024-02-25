"use client";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowStatusChip from "../../components/FollowChip/FollowStatusChip";
import { formatCount } from "../../../utils/utils";
import { Image } from "@nextui-org/react";
import { addUser } from "../../../lib/features/usersSlice";

const page = ({ params }) => {
  const { userId } = params;
  const dispatch = useDispatch();
  const curUserId = useSelector((state) => state.main.userId);
  const curUser = useSelector((state) => state.user.users[curUserId]);
  const user = useSelector((state) => state.user.users[userId]);

  if (!user) {
    dispatch(addUser({ userId }));
  }
  const posts = useSelector((state) => state.post.posts);

  return !user ? (
    "Loading..."
  ) : (
    <div className="flex flex-col w-full min-h-fit mx-10 justify-start">
      <div className="flex p-2 w-full h-[30vh] border-b">
        <div className="flex p-2 flex-1 w-full h-full justify-center items-center">
          <Avatar className="w-40 h-40 text-large" src={user.profilePic} />
        </div>
        <div className="flex flex-col p-2 flex-1 items-center justify-around">
          <div className="flex space-x-2 items-center">
            <div>{user.username}</div>
            {curUser && curUser._id !== user._id && (
              <FollowStatusChip user1={curUser} user2={user} />
            )}
            {/* <div>Message</div> */}
          </div>
          <div className="flex justify-around w-full">
            <div>{`${formatCount(user.posts.length)} posts`}</div>
            <div>{`${formatCount(user.followers.length)} followers`}</div>
            <div>{`${formatCount(user.following.length)} following`}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between mt-2">
        {user.posts.map((post) => {
          return (
            post && (
              <div className="mb-4 px-2" key={post._id}>
                <Image
                  className="object-cover w-full max-w-full"
                  alt="Post Image"
                  isZoomed
                  width={220}
                  src={post.photo}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default page;
