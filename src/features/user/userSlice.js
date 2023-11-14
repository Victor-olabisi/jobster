import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { addUserLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";




const initialState = {
    isLoading: true,
    user:null
}

// register user to the api
export const registerUser = createAsyncThunk('registerUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post("/auth/testingRegister", user);
            return resp.data
            console.log(resp.data);
        } catch (error) {
            return error
        }
        
        // return resp.dat
        
    }
)
export const loginUser = createAsyncThunk('loginUser',
    async (user, thunkAPI) => {
       try {
            const resp = await customFetch.post("/auth/login", user);
            console.log(resp);
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
            console.log(payload);
            toast.success(`hello there ${user.name}`)
            addUserLocalStorage(user)
            state.user = user

            // console.log(payload);
        },
        [registerUser.rejected]: (state) => {
            
        }

    }
})



export default userSlice.reducer