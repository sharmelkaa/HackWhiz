import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import commentsReducer from '../slices/commentsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        comments: commentsReducer
    },
})