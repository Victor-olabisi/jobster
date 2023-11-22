import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { logoutUser } from "../user/userSlice";
import jobSlice from "../job/jobSlice";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

// initial state
const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "getAllJobs",
  async (_, thunkAPI) => {
    const url = "/jobs";
    try {
      const resp = await customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      // console.log(resp.data);
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("unauthorized! logging out");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const allJobs = createSlice({
  name: "jobs",
  initialState,
  reducer: {
    showLoading: (state) => {
      state.isLoading=true
    },
    hideLoading: (state) => {
      state.isLoading= false
    }
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, action) => {
      // console.log(action);
      const { jobs } = action.payload;
      state.jobs = jobs;

      state.isLoading = false;
      // console.log(payload);
    },
  },
});


export const {showLoading, hideLoading} = allJobs.actions

export default allJobs.reducer;
