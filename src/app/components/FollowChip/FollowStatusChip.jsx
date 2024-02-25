import UnfollowChip from "./UnfollowChip";
import FollowChip from "./FollowChip";

const FollowStatusChip = ({ user1, user2 }) => {
  return user1?.following?.includes(user2._id) ? (
    <UnfollowChip followee={user2} />
  ) : (
    <FollowChip followee={user2} />
  );
};

export default FollowStatusChip;
