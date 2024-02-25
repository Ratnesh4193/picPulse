"use client";
import Sidebar from "./SideBar";
import RightSideBar from "./RightSideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Layout = ({ sidebar, rightSideBar, children }) => {
  const [loaded, setLoaded] = useState(false);
  const isSideBarOpen = useSelector((state) => state.main.ui.isSideBarOpen);
  useEffect(() => setLoaded(true), []);
  return (
    loaded && (
      <div className="w-full min-h-screen bg-black text-white flex">
        <div
          className={`${
            isSideBarOpen ? "w-[15%]" : "w-[5%]"
          } border-r-1 border-slate-700`}
        >
          {sidebar || <Sidebar />}
        </div>
        <div
          className={`${
            isSideBarOpen ? "w-[85%]" : "w-[95%]"
          } flex justify-center`}
        >
          {children}
        </div>
        {isSideBarOpen && (
          <div className="w-3/12 border-l-1 border-slate-700 overflow-hidden">
            {rightSideBar || <RightSideBar />}
          </div>
        )}
      </div>
    )
  );
};

export default Layout;
