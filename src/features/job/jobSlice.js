import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
isLoading:false
}

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        
    }
})

export default jobSlice.reducer