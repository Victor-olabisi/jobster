import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsReducer from './features/all-jobs/allJobs'

const store = configureStore({
    reducer:{
        user: userSlice,
        job: jobSlice,
        allJobs:allJobsReducer,
    }
})

export default store