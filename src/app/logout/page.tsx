"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../lib/features/mainSlice";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const logOut = async () => {
      const response = await axios.get(`/api/auth/logout`);
      dispatch(logoutUser());
      router.push("/login");
    };
    logOut();
  });
  return <div>Logging you out...</div>;
};

export default page;
