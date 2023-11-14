import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { addUserLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";




const initialState = {
  isLoading: true,
  user: getUserFromLocalStorage(),
};

// register user to the api
export const registerUser = createAsyncThunk('registerUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post("/auth/register", user);
            return resp.data
        } catch (error) {
            return error
        }
        
        // return resp.dat
        
    }
)
// login user
export const loginUser = createAsyncThunk('loginUser',
    async (user, thunkAPI) => {
       try {
           const resp = await customFetch.post("/auth/login", user);
           return resp.data
            // console.log(resp);
       } catch (error) {
        return error
       }
   
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [registerUser.pending]: (state) => {
           state.isLoading=true 
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            const {user}= payload
            state.isLoading = false
            // console.log(payload);
            toast.success(`hello there ${user.name}`)
            state.user = user
            addUserLocalStorage(user)

        },
        [registerUser.rejected]: (state) => {
            
        },
        [loginUser.pending]: (state) => {
           state.isLoading = true 
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const {user}= payload
            state.isLoading = false;
            addUserLocalStorage(user)
            state.user = user
            toast.success(`welcome back there ${user.name}`)
        
        }

    }
})



export default userSlice.reducer