import { logoutUser } from "../user/userSlice";
import customFetch from "../../utils/customFetch";
import { showLoading, hideLoading, getAllJobs } from "../all-jobs/allJobs";
import { clearValues } from "./jobSlice";




export const addJobsThunk = async (user, thunkAPI) => {
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
};


// delete jobs
export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
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
};

// edit job
export const  editJobsThunk =  async ({ job, jobId }, thunkAPI) => {
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
    