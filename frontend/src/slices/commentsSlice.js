import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    comments: null
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        updateComments: (state, action) => {
            state.comments = action.payload
        }
    }
})

export const { updateComments } = commentsSlice.actions
export default commentsSlice.reducer