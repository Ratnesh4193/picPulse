import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { addPosts } from "./postsSlice";

const initialState = {
  users: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/user/all`);
      const users = data.reduce((acc, user) => {
        acc[user._id] = user;
        if (user.posts) {
          thunkAPI.dispatch(addPosts(user.posts));
        }
        return acc;
      }, {});

      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ user, userId }, thunkAPI) => {
    try {
      if (user) {
        return user;
      } else {
        const response = await axios.get(`/api/user/${userId}`);
        if (response && response.data && response.data.posts) {
          thunkAPI.dispatch(addPosts(response.data.posts));
        }
        return response.data.user;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.users[action.payload._id] = action.payload;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      const newUsers = action.payload;
      state.users = { ...state.users, ...newUsers };
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { clearState } = usersSlice.actions;

export const getUserState = createSelector(
  [(state) => state.user],
  (user) => user
);

export const getUsersList = createSelector(
  [(state) => state.user.users],
  (users) =>
    Object.entries(users).map(([key, value]) => {
      return { ...value };
    })
);

export const getUser = (userId) =>
  createSelector([(state) => state.user.users], (users) => {
    return users[userId];
  });

export const getUserChatGroups = (userId) =>
  createSelector([(state) => state.user.users], (users) => {
    return users[userId].chatGroups;
  });

export default usersSlice.reducer;
