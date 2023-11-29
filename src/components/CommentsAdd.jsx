import { useSelector, useDispatch } from "react-redux";
import { addComment, updateComment } from "../features/comments/commentsSlice";
import React from "react";

const CommentsAdd = ({ editComment, setEditComment, content, commentId }) => {
  const { commentsData } = useSelector((store) => store.comments);
  const [comment, setComment] = React.useState("");
  const [commentEdit, setCommentEdit] = React.useState(content);

  const dispatch = useDispatch();

  const handleAddCommentChange = (even) => {
    setComment(even.target.value);
  };

  const handleEditCommentChange = (even) => {
    setCommentEdit(even.target.value);
  };

  function handleComment() {
    if (editComment) {
      dispatch(updateComment({ commentEdit, commentId }));
      setEditComment(false);
    } else {
      dispatch(addComment(comment));
      setComment("");
    }
  }
  return (
    <section className=" relative bg-white flex items-start p-6 rounded-lg gap-6 justify-between max-md:h-64 max-md:px-0">
      <img
        src={commentsData.currentUser.image.png}
        width={45}
        alt="user profile"
        className="max-md:absolute max-md:bottom-5 max-md:left-5"
      />
      <textarea
        placeholder="Add a comment..."
        value={editComment ? commentEdit : comment}
        onChange={
          editComment ? handleEditCommentChange : handleAddCommentChange
        }
        className="w-11/12 h-32 border px-5 py-3 rounded-lg max-md:mx-auto"
      ></textarea>
      <button
        disabled={
          editComment
            ? commentEdit.trim() == ""
              ? true
              : false
            : comment.trim() == ""
            ? true
            : false
        }
        onClick={handleComment}
        className="bg-moderate-blue-primary disabled:opacity-70 rounded-lg text-white font-medium py-3 px-7 max-md:absolute max-md:bottom-5 max-md:right-5"
      >
        {editComment ? "UPDATE" : "SEND"}
      </button>
    </section>
  );
};

export default CommentsAdd;
