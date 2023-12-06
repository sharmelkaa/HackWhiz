import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getData} from "../api/getData";
import {getJWT} from "../helpers/manageLocalStorage";

const JWT = getJWT()

const isLogged = JWT !== null
let currentUser = null
let isAdmin = null
let error = null

if (isLogged) {
    const response = await getData('personal_data')
    if (response.hasOwnProperty('message')) {
        error = response.message
    }
    currentUser = response
    isAdmin = currentUser.username === 'admin'
}

const initialState = {
    isLogged,
    currentUser,
    isAdmin,
    error
}

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (thunkAPI) => {
        const response = await getData('personal_data')

        if (response.hasOwnProperty('message')) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isLogged = true
            state.currentUser = action.payload
        },
        logOut: (state) => {
            state.isLogged = false
            state.currentUser = null
        },
        setUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.currentUser = action.payload
        })
            .addCase(updateUserData.rejected, (state, action) => {
                state.error = action.payload
        })
    },
})

export const { logIn, logOut, setUser } = userSlice.actions

export default userSlice.reducer