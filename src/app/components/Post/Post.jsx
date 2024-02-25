import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  useDisclosure,
} from "@nextui-org/react";
import UserHeader from "../UserHeader/UserHeader";
import { formatCount, timeAgo } from "../../../utils/utils";
import CommentBox from "../CommentBox/CommentBox";
import { useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa6";
import CommentModal from "../commentModal/commentModal";
import LikeStatusBtn from "../LikeBtn/LikeStatusBtn";
import { getUser } from "../../../lib/features/usersSlice";
import { getLoggedUser } from "../../../lib/features/mainSlice";

const Post = ({ post }) => {
  const { caption, photo, likes, postedBy, createdAt, comments } = post;
  const user = useSelector(getUser(postedBy));
  const curUserId = useSelector(getLoggedUser);
  const curUser = useSelector(getUser(curUserId));

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    post &&
    user &&
    curUserId && (
      <>
        <CommentModal
          post={post}
          user={user}
          curUser={curUser}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
        <Card className="my-10 bg-black text-white border-y-1">
          <CardHeader className="flex">
            <div className="w-[15vw]">
              <UserHeader user={user} />
            </div>
            <div className="w-full font-semibold text-default-400 text-small text-right">
              {timeAgo(new Date(createdAt))}
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover w-full max-w-full"
              src={photo}
            />
          </CardBody>
          <CardBody className="flex flex-row items-start gap-4">
            <LikeStatusBtn user={curUser} post={post} />
            <FaRegComment className="w-6 h-6 hover:cursor-pointer" />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="font-semibold text-small">
              {formatCount(likes.length)} likes
            </div>
            <div className="flex gap-2 justify-center font-semibold text-small">
              <div>{user.username}</div>
              <div>{caption}</div>
            </div>
            <div
              className="font-semibold text-default-400 text-small hover:cursor-pointer"
              onClick={() => {
                onOpen();
              }}
            >
              View all {comments.length} comment
            </div>
            <div className="w-full text-white">
              <CommentBox post={post} />
            </div>
          </CardFooter>
        </Card>
      </>
    )
  );
};

export default Post;
