import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";




const initialState = {
    isLoading: true,
    user:null
}

// post user to the api
export const registerUser = createAsyncThunk('registerUser',
    async(user, thunkAPI) => {
        const resp = await customFetch.post("/auth/register", user);
        console.log(resp);
        // return resp.data
        
    }
)
export const loginUser = createAsyncThunk('loginUser',
   async (user, thunkAPI) => {
       const resp = await customFetch.post("/auth/login", user);
       console.log(resp);
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState
})



export default userSlice.reducer