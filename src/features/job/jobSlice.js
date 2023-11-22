import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { showLoading, hideLoading, getAllJobs } from "../all-jobs/allJobs";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};
//  create jobs
export const addJobs = createAsyncThunk("addJobs", async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("unauthorized! logging out");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

// delete jobs
export const deleteJobs = createAsyncThunk(
  "deleteJobs",
  async (jobId, thunkAPI) => {
    try {
      console.log(jobId);
      // thunkAPI.dispatch(showLoading())
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// edit jobs
export const editJobs = createAsyncThunk(
  "editJob",
  async ({ job, jobId }, thunkAPI) => {
    try {
       const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
         headers: {
           Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
         },
       });
      thunkAPI.dispatch(clearValues())
      return resp.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.msg)
      console.log(error);
    }
   
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleFormInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state) => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  // add jobs
  extraReducers: {
    [addJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [addJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      toast.success("job added successfully");
    },

    // edit job
    [editJobs.pending]: (state) => {
      state.isLoading=true
    },
    [editJobs.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('job modified')
    }
  },

});

export const { handleFormInput, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
