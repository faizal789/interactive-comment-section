import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  commentId: "",
  commentIndex: 0,
  replyId: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCommentModal: (state, action) => {
      state.isOpen = true;
      state.commentId = action.payload;
    },
    openReplyModal: (state, action) => {
      const { commentId, replyId } = action.payload;
      state.isOpen = true;
      state.commentIndex = commentId;
      state.replyId = replyId;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openCommentModal, openReplyModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
