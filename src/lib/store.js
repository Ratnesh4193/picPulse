import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./features/mainSlice";
import usersReducer from "./features/usersSlice";
import postsReducer from "./features/postsSlice";
import chatReducer from "./features/chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      main: mainReducer,
      user: usersReducer,
      post: postsReducer,
      chat: chatReducer,
    },
  });
};
