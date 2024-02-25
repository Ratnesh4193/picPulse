import LikeBtn from "./LikeBtn";
import DisLikeBtn from "./DisLikeBtn";

const LikeStatusBtn = ({ user, post }) => {
  return post?.likes?.includes(user._id) ? (
    <LikeBtn user={user} post={post} />
  ) : (
    <DisLikeBtn user={user} post={post} />
  );
};

export default LikeStatusBtn;
