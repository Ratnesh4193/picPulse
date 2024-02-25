"use client";
import { Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { addPosts } from "../../../lib/features/postsSlice";
import { callRedis } from "../../../lib/features/chatSlice";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [checkFile, setCheckFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setCheckFile(true);
  };

  const postImage = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "rkt4193");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/rkt4193/image/upload/",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImage = await res.json();

    return uploadedImage.url;
  };

  const uploadPost = async () => {
    if (caption === "") {
      setError("Please write a caption first !!!");
      return;
    }
    if (!selectedFile) {
      setError("Please upload an image !!!");
      return;
    }
    setIsLoading(true);
    const url = await postImage();

    const post = await axios.post("/api/post/create", {
      caption,
      url,
    });
    dispatch(addPosts([post]));
    router.push("/", { scroll: false });
  };

  return (
    <div className="flex f-full items-center justify-center">
      <div className="p-12 flex flex-col items-center justify-center gap-4 h-fit w-[30vw] border-slate-800 border-2 rounded-md ">
        <Textarea
          radius="md"
          type="text"
          variant="bordered"
          label="Caption"
          placeholder="Enter a caption"
          className="max-w-xs"
          value={caption}
          onChange={(e) => {
            console.log("callRedis");
            dispatch(callRedis(e.target.value));
            setCaption(e.target.value);
          }}
        />

        <div className="flex flex-col justify-center items-center gap-2">
          <div className="cursor-pointer relative flex justify-center items-center border-1 border-slate-500 rounded-md hover:border-slate-700">
            <input
              type="file"
              name="file"
              onChange={imageHandler}
              className="z-20 opacity-0 cursor-pointer h-full w-full"
            />
            <div className="absolute flex justify-center items-center gap-2">
              <span className="text-[18px] w-full truncate">
                {checkFile ? selectedFile.name : "choose a file"}
              </span>
            </div>
          </div>
          {selectedFile && (
            <Image
              alt="Card background"
              className={`object-cover w-full max-w-full ${
                checkFile ? "opacity-1" : "opacity-0"
              }`}
              src={selectedFile ? URL.createObjectURL(selectedFile) : null}
            />
          )}
        </div>

        {error !== "" && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}

        <CustomButton
          color="primary"
          variant="ghost"
          fullWidth={true}
          onClick={uploadPost}
          content="Post"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default page;
