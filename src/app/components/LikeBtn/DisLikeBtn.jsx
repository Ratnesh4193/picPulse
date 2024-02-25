import axios from "axios";
import { FcLikePlaceholder } from "react-icons/fc";
import { addPost } from "../../../lib/features/postsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const DisLikeBtn = ({ user, post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await axios.post("/api/post/like", {
        postId: post._id,
      });
      const updatedPost = result.data;
      dispatch(addPost({ post: updatedPost, postId: updatedPost._id }));
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
    setIsLoading(false);
  };
  return (
    <div
      className={`w-6 h-6 hover:cursor-pointer ${isLoading && "animate-pulse"}`}
    >
      <FcLikePlaceholder className="w-6 h-6" onClick={handleLike} />
    </div>
  );
};

export default DisLikeBtn;
