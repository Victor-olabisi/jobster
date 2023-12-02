import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { logoutUser } from "../user/userSlice";
import jobSlice from "../job/jobSlice";
import authHeader from "../../utils/authHead";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
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
    const {page, search,searchStatus, searchType,sort}= thunkAPI.getState().allJobs
    let url = `/jobs?status=${searchStatus}&page=${page}&sort=${sort}&jobType=${searchType}`;
    if (search) {
      url = url + `&search${search}`
    }
    try {
      const resp = await customFetch.get(url,authHeader(thunkAPI)
      );
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


// get stat
export const showStat = createAsyncThunk('show/stat', async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats", authHeader(thunkAPI));

    return resp.data
    
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.message)
  }
})
const allJobs = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading=true
    },
    hideLoading: (state) => {
      state.isLoading= false
    },
    clearFilter: (state) => {
      return { ...state, ...initialFiltersState };
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      state[name]= value
    },
    changePage: (state, { payload }) => {
      state.page = payload
    },
    setFilter:(state)=> initialState
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, action) => {
      const { jobs } = action.payload;
      state.jobs = jobs;
      state.numOfPages = action.payload.numOfPages
      state.totalJobs = action.payload.totalJobs
      state.isLoading = false;
    },
    // stat
    [showStat.pending]: (state) => {
      state.isLoading = true
    
    },
    [showStat.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
      
    }
  },
});


export const {showLoading, hideLoading,clearFilter, handleChange,setFilter, changePage} = allJobs.actions

export default allJobs.reducer;
