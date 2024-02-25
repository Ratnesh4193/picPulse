"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { isValidEmail } from "../../utils/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const submitHandler = async () => {
    // Check if all fields are set
    if (!name || !username || !password || !email) {
      setError("Please fill in all fields");
      return;
    }

    // Check if the email is valid
    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      setIsLoading(true);
      const data = await axios.post("/api/auth/signup", {
        name,
        username,
        password,
        email,
      });
      router.push("/login", { scroll: false });
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div className="px-12 py-5 flex flex-col items-center justify-center gap-4 min-h-auto w-[30vw] border-slate-800 border-2 rounded-md ">
        <div className="mt-10 m-5 mx-10 text-4xl font-cursive hover:cursor-pointer">
          PicPulse
        </div>
        <div className="font-semibold text-default-400 text-small">
          Sign up to see photos and videos from your friends.
        </div>

        <Input
          size="sm"
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
          radius="md"
          type="text"
          variant="bordered"
          label="Full Name"
          placeholder="Enter your Full Name"
          className="max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          radius="md"
          type="text"
          variant="bordered"
          label="User Name"
          placeholder="Enter your User Name"
          className="max-w-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button
          color="primary"
          variant="ghost"
          fullWidth={true}
          onClick={submitHandler}
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </div>
      <div className="flex items-center gap-2 justify-center p-5 w-[30vw] border-slate-800 border-2 rounded-md ">
        Have an account?
        <Link
          className="hover:cursor-pointer hover:text-slate-700"
          href="signup"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default page;
