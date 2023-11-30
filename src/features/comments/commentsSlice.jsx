import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import data from '../../../data.json'
const initialState = {
  commentsData: {},
  isLoading: true,
};

export const getCommentsData = createAsyncThunk(
  "comment/getCommentsData",
  async () => {
    try {
      const resp = await fetch('/interactive-comment-section/data.json');
      const data = await resp.json();
      // console.log(da)
      return data;
    } catch (error) {
      console.error(error)
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const userComment = {
        id: Date.now(),
        content: action.payload,
        createdAt: 'now',
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
        replies: [],
      };
      state.commentsData.comments.push(userComment);
    },
    updateComment: (state, action) => {
      const { commentId, commentEdit } = action.payload;
      const commentIndex = state.commentsData.comments.findIndex(
        (comment) => comment.id === commentId
      );
      if (commentIndex !== -1) {
        state.commentsData.comments[commentIndex].content = commentEdit;
      }
    },
    removeComment: (state, action) => {
      state.commentsData.comments = state.commentsData.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    addReply: (state, action) => {
      const { commentId, replyValue, username } = action.payload;
      const userReply = {
        id: Date.now(),
        content: replyValue,
        createdAt: 'now',
        score: 0,
        replyingTo: username,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      };

      state.commentsData.comments[commentId].replies.push(userReply);
    },
    updateReply: (state, action) => {
      const { commentId, replyId, replyEdit } = action.payload;
      const replyIndex = state.commentsData.comments[
        commentId
      ].replies.findIndex((reply) => reply.id === replyId);
      if (removeReply !== -1) {
        state.commentsData.comments[commentId].replies[replyIndex].content =
          replyEdit;
      }
    },

    removeReply: (state, action) => {
      const {commentIndex,replyId} = action.payload;
      state.commentsData.comments[commentIndex].replies =
        state.commentsData.comments[commentIndex].replies.filter(
          (reply) => reply.id !== replyId
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentsData = action.payload;
      })
      .addCase(getCommentsData.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const {
  addComment,
  updateComment,
  removeComment,
  addReply,
  updateReply,
  removeReply,
} = commentSlice.actions;

export default commentSlice.reducer;
