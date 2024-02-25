import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton/CustomButton";
import axios from "axios";
import { addUser } from "../../../lib/features/usersSlice";

const UnfollowChip = ({ followee }) => {
  const dispatch = useDispatch();

  const followerId = useSelector((state) => state.main.userId);
  const follower = useSelector((state) => state.user.users[followerId]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFollowUser = async () => {
    setIsLoading(true);
    const response = await axios.post(`/api/user/unfollow`, {
      unFollowId: followee._id,
      userId: follower._id,
    });
    const { updatedFollower, updatedFollowee } = response.data;

    dispatch(addUser({ user: updatedFollower, userId: updatedFollower._id }));
    dispatch(addUser({ user: updatedFollowee, userId: updatedFollowee._id }));
    setIsLoading(false);
  };

  return (
    <CustomButton
      color="danger"
      variant="light"
      onClick={handleFollowUser}
      content="Following"
      isLoading={isLoading}
    />
  );
};

export default UnfollowChip;
