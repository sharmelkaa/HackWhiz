import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    comments: {}
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        updateComments: (state, action) => {
            state.comments[action.payload.postID] = action.payload.commentsList
        }
    }
})

export const { updateComments } = commentsSlice.actions
export default commentsSlice.reducer