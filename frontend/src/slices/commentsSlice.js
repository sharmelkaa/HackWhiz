import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    comments: null
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        updateComments: (state, action) => {
            if (state.comments === null) {
                state.comments = {}
            }
            state.comments[action.payload.postID] = action.payload.commentsList
        }
    }
})

export const { updateComments } = commentsSlice.actions
export default commentsSlice.reducer