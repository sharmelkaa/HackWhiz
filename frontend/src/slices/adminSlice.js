import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchData} from "../api/fetchData";

const initialState = {
    allUsers: null,
    isLoading: false,
    error: null
}

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async(arg, { rejectWithValue }) => {
        try {
            const response = await fetchData('users_list', 'GET')
            if (response.hasOwnProperty('message')) {
                return rejectWithValue(response.message)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload
                state.error = null
                state.isLoading = false
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.allUsers = null
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true
                state.error = null
                state.allUsers = null
            })
    }
})

export const { resetError } = adminSlice.actions
export default adminSlice.reducer