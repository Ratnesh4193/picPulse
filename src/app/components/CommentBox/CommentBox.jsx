import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addPost } from "../../../lib/features/postsSlice";

const CommentBox = ({ post }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [isCommentProcessing, setIsCommentProcessing] = useState(false);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddComment();
    }
  };
  const handleAddComment = async () => {
    if (isCommentProcessing || commentText === "") return;
    setIsCommentProcessing(true);
    try {
      const result = await axios.post("/api/post/comment", {
        postId: post._id,
        commentText: commentText,
      });
      setCommentText("");
      const updatedPost = result.data;
      dispatch(addPost({ post: updatedPost, postId: updatedPost._id }));
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
    setIsCommentProcessing(false);
  };
  return (
    <Input
      isDisabled={isCommentProcessing}
      style={{ color: "white" }}
      type="text"
      placeholder="Add a comment..."
      fullWidth={true}
      variant="underlined"
      onKeyDown={handleKeyPress}
      onChange={(e) => setCommentText(e.target.value)}
      startContent={<FaComment className="text-2xl pointer-events-none" />}
    />
  );
};

export default CommentBox;
