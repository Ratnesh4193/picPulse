import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { logoutUser } from "../../../lib/features/mainSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.main.userId);
  const user = useSelector((state) => state.user.users[userId]);
  const isSideBarOpen = useSelector((state) => state.main.ui.isSideBarOpen);
  const router = useRouter();

  const items = [
    { label: "Home", icon: <FaHome />, url: "/", loggedIn: true },
    { label: "Search", icon: <FaSearch />, url: "/search" },
    {
      label: "Messages",
      icon: <FaRegMessage />,
      url: "/chat",
      loggedIn: true,
    },
    {
      label: "Create",
      icon: <IoIosCreate />,
      url: "/post/create",
      loggedIn: true,
    },
    {
      label: "Profile",
      icon: <Avatar name="Junior" />,
      url: user && `/profile/${user._id}`,
      loggedIn: true,
    },
    {
      label: "Logout",
      icon: <RiLogoutCircleLine />,
      url: "/logout",
      loggedIn: true,
    },
  ];
  return (
    <>
      <Link
        className="my-10 flex items-center justify-center w-full text-4xl font-cursive hover:cursor-pointer"
        href="/"
      >
        <div>{isSideBarOpen ? "PicPulse" : "P"}</div>
      </Link>
      <div className="px-5 font-forte w-full">
        <ul>
          {items.map((item, key) => {
            if (item.loggedIn) {
              if (user) {
                return (
                  <Link href={item.url} key={key}>
                    <li className="flex w0full items-center justify-center p-2 my-4 text-md rounded-md hover:bg-slate-900 hover:cursor-pointer">
                      <div className="text-3xl px-3">{item.icon}</div>{" "}
                      {isSideBarOpen && item.label}
                    </li>
                  </Link>
                );
              } else return null;
            }
            return (
              <Link href={item.url} key={key}>
                <li className="flex items-center justify-center p-2 my-4 text-md rounded-md hover:bg-slate-900 hover:cursor-pointer">
                  <div className="text-3xl px-3">{item.icon}</div>
                  {isSideBarOpen && item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
