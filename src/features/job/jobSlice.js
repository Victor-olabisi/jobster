import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { addJobsThunk,editJobsThunk,deleteJobThunk } from "./jobThunk";
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
export const addJobs =createAsyncThunk("addJobs",addJobsThunk);

// delete jobs
export const deleteJobs = createAsyncThunk(
  "deleteJobs", deleteJobThunk
);

// edit jobs
export const editJobs = createAsyncThunk(
  "editJob", editJobsThunk
 
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
    },

    [deleteJobs.fulfilled]: (state) => {
    toast.success('job deleted')
  }
  },

});

export const { handleFormInput, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
