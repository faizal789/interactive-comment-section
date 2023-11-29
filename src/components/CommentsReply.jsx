import { useSelector, useDispatch } from "react-redux";
import { removeReply } from "../features/comments/commentsSlice";
import ReplyAdd from "./ReplyAdd";
import React from "react";
import Modal from "./modal";
import { openReplyModal } from "../features/modal/modalSlice";

const CommentsReply = ({ reply, commentId, replyId }) => {
  const [replyScore, setReplyScore] = React.useState(reply.score);
  const { commentsData } = useSelector((store) => store.comments);
  const dispatch = useDispatch();
  const [isreply, setIsReply] = React.useState(false);
  const [editReply, setEditReply] = React.useState(false);
  const { isOpen } = useSelector((store) => store.modal);

  function handleRemove() {
    dispatch(openReplyModal({ commentId, replyId }));
    // dispatch(removeReply({ replyId, commentIndex: commentId }));
  }

  function handleIncrease() {
    if (replyScore > reply.score) {
      return;
    } else {
      setReplyScore((prevCount) => prevCount + 1);
    }
  }

  function handleDecrease() {
    if (replyScore == reply.score) {
      return;
    } else {
      setReplyScore((prevCount) => prevCount - 1);
    }
  }
  return (
    <>
      {isOpen && <Modal></Modal>}
      <section className="relative bg-white rounded-lg flex max-md:flex-col-reverse items-start p-6  max-md:p-3 gap-6">
        <div className="flex flex-col max-md:flex-row max-md:gap-5 max-md:p-2 bg-very-light-gray-neutral p-3 rounded-lg">
          <button
            onClick={handleIncrease}
            className=" text-grayish-blue-neutral font-bold opacity-50 hover:opacity-100"
          >
            +
          </button>
          <span className="text-moderate-blue-primary font-medium">
            {replyScore}
          </span>
          <button
            onClick={handleDecrease}
            className="text-grayish-blue-neutral font-bold opacity-50 hover:opacity-100"
          >
            -
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <img src={reply.user.image.png} width={35} alt="profile" />
              <h2 className="text-dark-blue-neutral font-bold">
                {reply.user.username}
              </h2>
              {commentsData.currentUser.username === reply.user.username && (
                <span className="bg-moderate-blue-primary text-white rounded-sm px-2">
                  you
                </span>
              )}
              <p className=" text-grayish-blue-neutral">{reply.createdAt}</p>
            </div>
            <div className="flex items-center">
              <div>
                {commentsData.currentUser.username === reply.user.username ? (
                  <div className="flex items-center gap-5 max-md:absolute max-md:bottom-5 max-md:right-5">
                    <div className="flex items-center gap-2 hover:opacity-70">
                      <img src="images/icon-delete.svg" alt="refly image" />
                      <button
                        onClick={handleRemove}
                        className="text-soft-red-primary font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="flex items-center gap-2 hover:opacity-70">
                      <img src="images/icon-edit.svg" alt="refly image" />
                      <button
                        onClick={() => setEditReply(true)}
                        className=" text-moderate-blue-primary font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 hover:opacity-70 max-md:absolute max-md:bottom-5 max-md:right-5">
                    <img src="images/icon-reply.svg" alt="refly image" />
                    <button
                      onClick={() => setIsReply(true)}
                      className=" text-moderate-blue-primary font-medium text-lg"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-grayish-blue-neutral">
            <span className="font-bold text-moderate-blue-primary">
              @{reply.replyingTo}{" "}
            </span>
            {reply.content}
          </div>
        </div>
      </section>
      {editReply && (
        <ReplyAdd
          commentId={commentId}
          username={reply.user.username}
          setIsReply={setIsReply}
          editReply={editReply}
          setEditReply={setEditReply}
          replyId={replyId}
          content={reply.content}
        ></ReplyAdd>
      )}
      {isreply && (
        <ReplyAdd
          commentId={commentId}
          username={reply.user.username}
          setIsReply={setIsReply}
        ></ReplyAdd>
      )}
    </>
  );
};

export default CommentsReply;
