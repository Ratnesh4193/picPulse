import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import React from "react";
import { Image } from "@nextui-org/react";
import { formatCount, timeAgo } from "../../../utils/utils";
import UserHeader from "../UserHeader/UserHeader";
import CommentCard from "../CommentBox/CommentCard";
import Link from "next/link";
import CommentBox from "../CommentBox/CommentBox";
import LikeStatusBtn from "../LikeBtn/LikeStatusBtn";
import { FaRegComment } from "react-icons/fa";

const commentModal = ({ isOpen, onOpen, onClose, user, post, curUser }) => {
  return (
    <Modal className="bg-black" size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <Card className="mb-2 bg-black text-white border-y-1">
                <div className="flex w-full border-b">
                  <div className="flex flex-1 w-full h-full justify-center items-center">
                    <Image
                      className="object-cover w-full max-w-full"
                      alt="Post Image"
                      src={post.photo}
                    />
                  </div>
                  <div className="flex flex-col p-2 flex-1 items-center justify-around">
                    <CardHeader className="flex">
                      <div className="w-[15vw]">
                        <UserHeader user={curUser} />
                      </div>
                      <div className="w-full font-semibold text-default-400 text-small text-right">
                        {timeAgo(new Date(post.createdAt))}
                      </div>
                    </CardHeader>

                    <CardBody className="flex py-2 h-[10vh] no-scrollbar">
                      <div className="flex items-center justify-start text-sm w-full">
                        <Link href={`/profile/${curUser._id}`} className="p-2 ">
                          <Avatar src={curUser.profilePic} size="md" />
                        </Link>
                        <div className="p-2">
                          <div className="flex items-center space-x-3">
                            <Link
                              href={`/profile/${curUser._id}`}
                              className="font-bold"
                            >
                              {curUser.username}
                            </Link>
                            <div className="font-semibold text-default-400 text-small">
                              {post.caption}
                            </div>
                          </div>
                        </div>
                      </div>
                      {post.comments.map((comment) => {
                        return (
                          <CommentCard key={comment._id} comment={comment} />
                        );
                      })}
                    </CardBody>

                    <CardFooter className="flex flex-col items-start gap-2">
                      <div className="flex flex-row items-start gap-4">
                        <LikeStatusBtn user={curUser} post={post} />
                        <FaRegComment className="w-6 h-6 hover:cursor-pointer" />
                      </div>
                      <div className="font-semibold text-small">
                        {formatCount(post.likes.length)} likes
                      </div>
                      <div className="w-full font-semibold text-default-400 text-small">
                        {timeAgo(new Date(post.createdAt))}
                      </div>
                      <div className="w-full text-white">
                        <CommentBox post={post} />
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default commentModal;
