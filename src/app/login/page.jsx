"use client";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { isValidEmail } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, signinUser } from "../../lib/features/mainSlice";
import CustomButton from "../components/CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addUser } from "../../lib/features/usersSlice";

const page = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { user, isLoading } = useSelector((state) => state.main);

  const submitHandler = async () => {
    if (email) {
      if (!isValidEmail(email)) {
        setError("Enter a valid email!");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const response = await axios.post(`/api/auth/signin`, {
          email,
          password,
        });
        const data = await response.data.data;
        const userId = data._id;
        localStorage.setItem("userId", JSON.stringify(userId));
        dispatch(addUser({ userId }));
        dispatch(logInUser(data._id));
        setLoading(false);
        router.push("/");
      } catch (error) {
        setError(JSON.stringify(error));
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 items-center justify-center">
      <div className="px-12 flex flex-col items-center justify-center gap-4 h-full w-[30vw] border-slate-800 border-2 rounded-md ">
        <div className="my-10 m-5 mx-10 text-4xl font-cursive hover:cursor-pointer">
          PicPulse
        </div>
        <Input
          radius="md"
          type="email"
          variant="bordered"
          label="Email"
          placeholder="Enter your email"
          className="max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error !== "" && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}
        <CustomButton
          color={"primary"}
          variant={"ghost"}
          fullWidth={true}
          onClick={submitHandler}
          isLoading={loading}
          content={"Log In"}
        />
      </div>

      <div className="flex items-center gap-2 justify-center p-5 w-[30vw] border-slate-800 border-2 rounded-md ">
        Don't have an account?{" "}
        <Link
          className="hover:cursor-pointer hover:text-slate-700"
          href="signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default page;
