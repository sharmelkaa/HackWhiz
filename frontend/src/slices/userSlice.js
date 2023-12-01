import {createSlice} from '@reduxjs/toolkit'
import {getData} from "../api/getData";
import {getJWT} from "../helpers/manageLocalStorage";

const JWT = getJWT()

const isLogged = JWT !== null
const currentUser = isLogged ? await getData('personal_data') : null

const initialState = {
    isLogged,
    currentUser
}
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
        }
    },
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer