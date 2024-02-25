"use client";
import { useSelector } from "react-redux";
import Post from "./components/Post/Post";

const page = () => {
  const postObj = useSelector((state) => state.post.posts);
  const postList = Object.entries(postObj).map(([key, value]) => {
    return { ...value };
  });
  return (
    <div className="w-[30vw] overflow-auto h-[90vh] no-scrollbar">
      {postList.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default page;
