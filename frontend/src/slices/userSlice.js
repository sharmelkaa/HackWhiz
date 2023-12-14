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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isLogged = true
            state.isAdmin = action.payload.username === 'admin'
            state.currentUser = action.payload
        },
        logOut: (state) => {
            state.isLogged = false
            state.currentUser = null
        },
        setUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { logIn, logOut, setUser } = userSlice.actions

export default userSlice.reducer