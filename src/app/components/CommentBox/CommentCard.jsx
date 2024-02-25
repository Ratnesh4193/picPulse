import { Avatar } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { timeAgo } from "../../../utils/utils";
import { useSelector } from "react-redux";

const CommentCard = (props) => {
  const { comment } = props;
  const userId = comment.postedBy;
  const user = useSelector((state) => state.user.users[userId]);
  return (
    user && (
      <div className="flex items-center justify-start text-sm w-full">
        <Link href={`/profile/${user._id}`} className="p-2 ">
          <Avatar src={user.profilePic} size="md" />
        </Link>
        <div className="p-2">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/${user._id}`} className="font-bold">
              {user.username}
            </Link>
            <div className="font-semibold text-default-400 text-small">
              {comment.text}
            </div>
          </div>
          <div className="font-semibold text-default-400 text-small">
            {timeAgo(new Date(comment.createdAt))}
          </div>
        </div>
      </div>
    )
  );
};

export default CommentCard;
