import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { addUser } from "./usersSlice";

const extractFromlocalStorage = (item) => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem(item));
  }
  return null;
};

const initialState = {
  userId: extractFromlocalStorage("userId"),
  ui: {
    isSideBarOpen: true,
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (user, thunkAPI) => {
    try {
      const { email, password } = user;
      const response = await axios.post(`/api/auth/signin`, {
        email,
        password,
      });
      const data = await response.data.data;
      const userId = data._id;
      thunkAPI.dispatch(addUser({ userId }));
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    clearState: () => {
      localStorage.removeItem("userId");
      return initialState;
    },
    loadUserFromlocalStorage: (state, action) => {
      state.userId = action.payload;
    },
    logInUser: (state, action) => {
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.userId = null;
      localStorage.removeItem("userId");
    },
    toggleSideBar: (state, action) => {
      state.ui.isSideBarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(action.payload));
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.error;
    });
  },
});

export const { clearState, logInUser, logoutUser, toggleSideBar } =
  mainSlice.actions;

// export const getMainState = (state) => state.main;
export const getMainState = createSelector([(state) => state.main], (main) => {
  return main;
});
// export const getMainState = (state) => state.main;
export const getLoggedUser = createSelector([(state) => state.main], (main) => {
  return main.userId;
});

// () => useSelector((state) => state.main.userId);

export default mainSlice.reducer;
