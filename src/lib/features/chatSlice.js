import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { addUser } from "./usersSlice";
import { redis } from "../../config/redisConfig";

const initialState = {
  chatGroups: {},
  messages: {},
  unSeenMessages: {},
  activeChatGroup: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, thunkAPI) => {
    try {
      const savedMessage = await axios.post(
        "/api/chat/message/addmessage",
        data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue("Some error occured");
    }
  }
);

export const createGroup = createAsyncThunk(
  "chat/createGroup",
  async ({ participants, name }, thunkAPI) => {
    try {
      const savedGroup = await axios.post("/api/chat/group/create", {
        participants,
        name,
      });
      const { data, users } = savedGroup.data;
      users.map((user) => {
        thunkAPI.dispatch(addUser({ user, userId: user._id }));
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Some error occured");
    }
  }
);

export const callRedis = createAsyncThunk(
  "chat/callRedis",
  async (data, thunkAPI) => {
    try {
      redis.set("hello", "hello");
    } catch (error) {
      return thunkAPI.rejectWithValue("Some error occured");
    }
  }
);

export const fetchChatGroupById = createAsyncThunk(
  "chat/fetchGroupById",
  async (chatGroupId, { getState }) => {
    const existingData = getState().chat.chatGroups[chatGroupId]; // Check if data is already in the store

    if (existingData) {
      return existingData; // Return existing data if present in the store
    }
    const response = await axios.get(`/api/chat/group/${chatGroupId}`); // Replace with your actual API call
    return response.data.data; // Return the fetched data
  }
);

export const fetchChatByGroupId = createAsyncThunk(
  "chat/fetchChatByGroupId",
  async (groupId, { getState }) => {
    const existingData = getState().chat.messages[groupId]; // Check if data is already in the store

    if (existingData) {
      return existingData; // Return existing data if present in the store
    }
    const response = await axios.get(`/api/chat/message/${groupId}`); // Replace with your actual API call

    return { data: response.data.data, groupId }; // Return the fetched data
  }
);

export const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    setGroup: (state, action) => {
      state.chatGroups = { ...state.chatGroups, ...action.payload };
      state.unSeenMessages = {
        ...state.unSeenMessages,
        ...action.payload.reduce((acc, group) => {
          acc[group.groupId] = 0;
          return acc;
        }, {}),
      };
    },
    setActiveChatGroup: (state, action) => {
      state.activeChatGroup = action.payload;
      state.unSeenMessages[action.payload] = 0;
    },
    addMessage: (state, action) => {
      const { groupId } = action.payload;
      state.messages[groupId] = state.messages[groupId] || [];
      state.messages[groupId].push(action.payload);
      if (groupId != state.activeChatGroup)
        state.unSeenMessages[groupId] = state.unSeenMessages[groupId] + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatGroupById.fulfilled, (state, action) => {
      const { _id: groupId } = action.payload;
      state.chatGroups[groupId] = action.payload;
      state.unSeenMessages[groupId] = 0;
    });
    builder.addCase(fetchChatByGroupId.fulfilled, (state, action) => {
      const { data, groupId } = action.payload;
      state.messages[groupId] = data;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.chatGroups[action.payload._id] = action.payload;
      state.unSeenMessages[action.payload._id] = 0;
    });
  },
});

export const { clearState, setGroup, setActiveChatGroup, addMessage } =
  chatsSlice.actions;
export const getGroupIdsList = createSelector([(state) => state.chat], (chat) =>
  Object.keys(chat.chatGroups)
);
export const getActiveChatGroup = createSelector(
  [(state) => state.chat],
  (chat) => chat.activeChatGroup
);
export const getGroupMessages = (groupId) =>
  createSelector([(state) => state.chat], (chat) => chat.messages[groupId]);
export const selectChatGroupById = (chatGroupId) =>
  createSelector(
    [(state) => state.chat],
    (chat) => chat.chatGroups[chatGroupId]
  );
export const selectChatGroupByIdWithFetch = (chatGroupId) =>
  createSelector([(state) => state.chat], (chat) => {
    const chatGroup = chat.chatGroups[chatGroupId];
    if (chatGroup) {
      return chatGroup;
    }
    return undefined;
  });
export const selectChatsByGroupIdWithFetch = (chatGroupId) =>
  createSelector([(state) => state.chat], (chat) => {
    const chatsByGroupId = chat.messages[chatGroupId];
    if (chatsByGroupId) {
      return chatsByGroupId;
    }
    return undefined;
  });
export const getUnSeenMsgCountByGroupId = (chatGroupId) =>
  createSelector(
    [(state) => state.chat],
    (chat) => chat.unSeenMessages[chatGroupId]
  );

export default chatsSlice.reducer;
