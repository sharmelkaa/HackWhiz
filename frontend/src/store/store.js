import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import commentsReducer from '../slices/commentsSlice'
import adminReducer from '../slices/adminSlice'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        comments: commentsReducer,
    },
})