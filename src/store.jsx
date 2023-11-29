import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './features/comments/commentsSlice'
import modalReducer from './features/modal/modalSlice'

export const store = configureStore({
  reducer: {
    comments : commentsReducer,
    modal : modalReducer
  },
})