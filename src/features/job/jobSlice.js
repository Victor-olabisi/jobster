import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

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

export const addJobs = createAsyncThunk("addJobs", async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", user, {
      headers: { Authorization: `Bearer ${thunkAPI.getState().user.user.token}` },
    });
      return resp.data
  } catch (error) {
      if (error.response === 401) {
          return thunkAPI.rejectWithValue('unauthorized! logging out')
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
  }
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleFormInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state) => {
      return { ...initialState };
    },
    },
    extraReducers: {
        [addJobs.pending]: (state) => {
            state.isLoading = true
            
        },
        [addJobs.fulfilled]: (state,{payload}) => {
            state.isLoading = false
            console.log(payload);
            toast.success('job added successfully')
        }
  }
});

export const { handleFormInput, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
