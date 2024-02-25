"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromlocalStorage } from "../../../lib/features/mainSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Auth = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.main);
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);
  const dispatch = useDispatch();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (!isLoading && user) {
      setIsUserValid(true);
    } else if (!isLoading && !user) {
      router.push("/login" + "?" + createQueryString("redirect", pathname));
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage && !user && !isLoading && !isUserValid) {
        const parsedUserFromLocalStorage = JSON.parse(userFromLocalStorage);
        dispatch(loadUserFromlocalStorage(parsedUserFromLocalStorage));
      }
    }
  }, [dispatch, user, isLoading, isUserValid]);

  return isUserValid ? <div>{children}</div> : null;
};

export default Auth;
