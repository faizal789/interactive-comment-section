import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { removeComment, removeReply } from "../features/comments/commentsSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { commentId, commentIndex, replyId } = useSelector(
    (store) => store.modal
  );

  function handleCancel() {
    dispatch(closeModal());
  }

  function handleDelete() {
    if (commentId) {
      dispatch(removeComment(commentId));
    }

    if (replyId) {
      dispatch(removeReply({ replyId, commentIndex }));
    }

    dispatch(closeModal());
  }

  return (
    <div className="inset-0 bg-black bg-opacity-30 w-screen h-screen fixed z-50 flex justify-center items-center">
      <div className="bg-white h-fit w-1/3 max-md:w-11/12 rounded-lg p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">Delete Comment</h1>
          <p className="text-grayish-blue-neutral">
            Are you sure you want to delete this comment? This will remove the
            comment and {`can't`} be undone
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <button
            onClick={handleCancel}
            className="text-white font-medium bg-grayish-blue-neutral rounded-lg px-4 py-2 w-1/2 hover:opacity-70"
          >
            NO, CANCEL
          </button>
          <button
            onClick={handleDelete}
            className="text-white font-medium bg-soft-red-primary rounded-lg px-4 py-2 w-1/2 hover:opacity-70"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
