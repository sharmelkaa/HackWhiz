import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const isLogged = localStorage.getItem('JWT') !== null

const initialState = {
    isLogged: isLogged,
    // currentUser: isLogged ? fetchUserData() : null
}

// const fetchUserData = createAsyncThunk(
//     'users/fetchUserData',
//     async (userId: number, thunkAPI) => {
//         const response = await userAPI.fetchById(userId)
//         return response.data
//     }
// )


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLogged = true
        },
        logOut: (state) => {
            state.isLogged = false
        }
    },

})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer