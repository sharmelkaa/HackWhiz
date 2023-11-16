import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {useRequest} from "../hooks/useRequest";
import {fetchData} from "../api/fetchData";

const initialState = {
    loading: false,
    user: null,
    error: null
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials, thunkAPI) => {
        const response = await fetchData('login', 'POST', userCredentials)
        localStorage.setItem('user', JSON.stringify(response))
        return response
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                console.log('we are here')
                state.error = action.payload
            })
    }
})

export const {  } = userSlice.actions

export default userSlice.reducer