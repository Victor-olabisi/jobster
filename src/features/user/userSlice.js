import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import {
  addUserLocalStorage,
  getUserFromLocalStorage,
  removerUserLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";



// register user to the api
export const registerUser = createAsyncThunk(
  "registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return error;
    }

    // return resp.dat
  }
);
// login user
export const loginUser = createAsyncThunk(
  "loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
      // console.log(resp);
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: setTimeout(() => {
    getUserFromLocalStorage()
  }, 5000),
};
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removerUserLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      // console.log(payload);
      addUserLocalStorage(user);
      state.user = user;
      toast.success(`hello there ${user.name}`);
    },
    [registerUser.rejected]: (state) => {},
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      addUserLocalStorage(user);
      state.isLoading = false;
      state.user = user;
      // toast.success(`welcome back there ${user.name}`);
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
