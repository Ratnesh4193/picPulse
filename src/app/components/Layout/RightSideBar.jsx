import { useEffect } from "react";
import UserHeader from "../UserHeader/UserHeader";
import { fetchAllUsers } from "../../../lib/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logoutUser } from "../../../lib/features/mainSlice";
import FollowStatusChip from "../FollowChip/FollowStatusChip";
import CustomButton from "../CustomButton/CustomButton";
import axios from "axios";
import { useRouter } from "next/navigation";

const RightSideBar = () => {
  const userId = useSelector((state) => state.main.userId);
  const user = useSelector((state) => state.user.users[userId]);
  const usersObject = useSelector((state) => state.user.users);
  const usersList = Object.entries(usersObject).map(([key, value]) => {
    return { ...value };
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    user && (
      <div className="p-4 py-8 flex flex-col max-h-screen overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center">
          <UserHeader user={usersObject[user._id]} />
          <div className="text-blue-500 hover:text-blue-700 cursor-pointer">
            <CustomButton
              variant="light"
              onClick={async () => {
                const response = await axios.get(`/api/auth/logout`);
                dispatch(logoutUser());
                router.push("/login");
              }}
              content="Switch"
            />
          </div>
        </div>
        <div className="p-2 my-3 flex justify-between items-center">
          <div className="font-semibold text-default-400 text-small">
            Suggested for you
          </div>
          <Link
            className="font-semibold hover:text-default-400 text-small"
            href="/search"
          >
            See All
          </Link>
        </div>
        <div>
          {usersList &&
            usersList.map((curUser) => {
              if (curUser._id === user._id) {
                return null;
              }
              return (
                <div
                  key={curUser._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="mr-2">
                      <UserHeader key={curUser._id} user={curUser} />
                    </div>
                  </div>
                  <div className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <FollowStatusChip
                      user1={usersObject[user._id]}
                      user2={curUser}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default RightSideBar;
