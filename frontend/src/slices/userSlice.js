import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
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
        const data = await response.json()
        const result = await data
        if (!response.ok) {
            return thunkAPI.rejectWithValue(result)
        }
        localStorage.setItem('user', JSON.stringify(data))
        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
        },
        cleanError: (state) => {
            state.error = null
        }
    },
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
                state.error = action.payload
            })
    }
})

export const { logOut, cleanError } = userSlice.actions

export default userSlice.reducer