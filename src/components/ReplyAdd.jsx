import { useSelector, useDispatch } from "react-redux";
import { addReply, updateReply } from "../features/comments/commentsSlice";
import React from "react";
const ReplyAdd = ({
  commentId,
  username,
  setIsReply,
  editReply,
  setEditReply,
  replyId,
  content,
}) => {
  const { commentsData } = useSelector((store) => store.comments);
  const [replyValue, setReplyValue] = React.useState("");
  const [replyEdit, setReplyEdit] = React.useState(content);

  const dispatch = useDispatch();
  const handleAddReplyChange = (even) => {
    setReplyValue(even.target.value);
  };

  const handleEditReplyChange = (even) => {
    setReplyEdit(even.target.value);
  };

  function Reply() {
    if (editReply) {
      dispatch(updateReply({ commentId, replyId, replyEdit }));
      setEditReply(false);
    } else {
      dispatch(addReply({ replyValue, commentId, username }));
      setIsReply(false);
    }
  }
  return (
    <section className="relative bg-white flex items-start p-6 rounded-lg gap-6 justify-between max-md:h-64 max-md:px-0">
      <img
        className="max-md:absolute max-md:bottom-5 max-md:left-5"
        src={commentsData.currentUser.image.png}
        width={45}
        alt="user profile"
      />
      <textarea
        placeholder="Add a reply..."
        value={editReply ? replyEdit : replyValue}
        onChange={editReply ? handleEditReplyChange : handleAddReplyChange}
        className="w-11/12 h-32 border px-5 py-3 rounded-lg max-md:mx-auto"
      ></textarea>
      <button
        disabled={
          editReply
            ? replyEdit.trim() == ""
              ? true
              : false
            : replyValue.trim() == ""
            ? true
            : false
        }
        onClick={Reply}
        className="bg-moderate-blue-primary disabled:opacity-70 rounded-lg text-white font-medium py-3 px-7 max-md:absolute max-md:bottom-5 max-md:right-5"
      >
        REPLY
      </button>
    </section>
  );
};

export default ReplyAdd;
