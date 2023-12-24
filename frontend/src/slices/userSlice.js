import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getJWT, removeLocalStorage, setLocalStorage} from "../helpers/manageLocalStorage";
import {fetchData} from "../api/fetchData";

const JWT = getJWT()
const isLogged = JWT !== null

const initialState = {
    isLoading: false,
    currentUser: null,
    isAdmin: null,
    error: null,
}

if (isLogged) {
    const response = await fetchData('personal_data', 'GET')
    if (response.hasOwnProperty('message')) {
       initialState.error = response.message
    } else {
        initialState.currentUser = response
        initialState.isAdmin = response.username === 'admin'
    }
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(data, { rejectWithValue }) => {
        try {
            const response = await fetchData('login', 'POST', data)
            if (response.hasOwnProperty('message')) {
                return rejectWithValue(response.message)
            }
            setLocalStorage('JWT', response.token)
            return response.user
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)
export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async(arg, { rejectWithValue }) => {
        try {
            const response = await fetchData('logout', 'POST')
            if (response.hasOwnProperty('message')) {
                return rejectWithValue(response.message)
            }
            removeLocalStorage('JWT')
            return response
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.currentUser = action.payload
        },
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null
                state.isAdmin = false
                state.error = null
                state.isLoading = false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload
                state.isAdmin = action.payload.username === 'admin'
                state.error = null
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload
                state.currentUser = null
                state.isAdmin = false
                state.isLoading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const { updateUser, resetError } = userSlice.actions

export default userSlice.reducer