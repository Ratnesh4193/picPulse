import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

export const addPost = createAsyncThunk(
  "post/addPost",
  async ({ post, postId }, thunkAPI) => {
    try {
      if (post) {
        return post;
      } else {
        const response = await axios.get(`/api/post/${postId}`);
        return response.data.post;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addPosts = createAsyncThunk(
  "post/addPosts",
  async (posts, thunkAPI) => {
    try {
      const postList = posts.reduce((acc, post) => {
        acc[post._id] = post;
        return acc;
      }, {});
      return postList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Some error occured");
    }
  }
);

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.posts[action.payload._id] = action.payload;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(addPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      const newPosts = action.payload;
      state.posts = { ...state.posts, ...newPosts };
    });
    builder.addCase(addPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { clearState } = postsSlice.actions;

export const getPostsList = (state) => {
  const posts = state.post.posts;
  const postsList = Object.entries(posts).map(([key, value]) => {
    return { ...value };
  });
  return postsList;
};

export default postsSlice.reducer;
