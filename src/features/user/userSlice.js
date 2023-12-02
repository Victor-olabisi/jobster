import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import {
  addUserLocalStorage,
  getUserFromLocalStorage,
  removerUserLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";
import { clearFilter } from "../all-jobs/allJobs";
import { clearValues } from "../job/jobSlice";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  // user: setInterval(() => {
  //   getUserFromLocalStorage();
  // }, 5000),
  user: getUserFromLocalStorage() || null,
};

export const updateUserProfile = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("unauthorized! logging out ");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

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

// clear store thunk
export const clearStore = createAsyncThunk("clearStore", async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearFilter());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject()
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      toast.success(payload);
      removerUserLocalStorage();
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      addUserLocalStorage(user);
      state.isLoading = false;
      // console.log(payload);
      state.user = user;
      toast.success(`hello there ${user.name}`);
    },
    [registerUser.rejected]: (state) => {},
    // login user
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      addUserLocalStorage(user);
      state.isLoading = false;
      state.user = user;
      toast.success(`welcome back there ${user.name}`);
    },
    // update user profile
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      console.log(payload);
      const { user } = payload;
      addUserLocalStorage(user);
      state.user = user;

      state.isLoading = false;
      toast.success("profile details updated");
    },
    [updateUserProfile.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
