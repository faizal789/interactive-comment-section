import React, { useEffect } from "react";
import CommentsReply from "./CommentsReply";
import { useSelector, useDispatch } from "react-redux";
import ReplyAdd from "./ReplyAdd";
import { removeComment, removeReply } from "../features/comments/commentsSlice";
import CommentsAdd from "./CommentsAdd";
import { openCommentModal } from "../features/modal/modalSlice";
import Modal from "./modal";
const CommentsCard = ({ comment, index, id }) => {
  const [commentScore, setCommentScore] = React.useState(comment.score);
  const { commentsData } = useSelector((store) => store.comments);
  const [reply, setIsReply] = React.useState(false);
  const [editComment, setEditComment] = React.useState(false);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  function handleIncrease() {
    if (commentScore > comment.score) {
      return;
    } else {
      setCommentScore((prevCount) => prevCount + 1);
    }
  }

  function handleDecrease() {
    if (commentScore == comment.score) {
      return;
    } else {
      setCommentScore((prevCount) => prevCount - 1);
    }
  }

  function handleClick() {
    setIsReply(true);
  }

  function handleRemove() {
    dispatch(openCommentModal(id));
  }

  return (
    <>
      {isOpen && <Modal></Modal>}

      <section className="relative bg-white rounded-lg flex max-md:flex-col-reverse items-start p-6 max-md:p-3 gap-6">
        <div className=" flex flex-col max-md:flex-row max-md:gap-5 max-md:p-2 bg-very-light-gray-neutral p-3 rounded-lg">
          <button
            onClick={handleIncrease}
            className=" text-grayish-blue-neutral font-bold opacity-50 hover:opacity-100"
          >
            +
          </button>
          <span className="text-moderate-blue-primary font-medium">
            {commentScore}
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
              <img src={comment.user.image.png} width={35} alt="profile" />
              <h2 className="text-dark-blue-neutral font-bold">
                {comment.user.username}
              </h2>
              <p className=" text-grayish-blue-neutral">{comment.createdAt}</p>
            </div>
            <div className="flex items-center">
              <div>
                {commentsData.currentUser.username === comment.user.username ? (
                  <div className="flex gap-5 max-md:absolute max-md:bottom-5 max-md:right-5">
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
                        onClick={() => setEditComment(true)}
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
                      onClick={handleClick}
                      className=" text-moderate-blue-primary font-medium text-lg"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-grayish-blue-neutral">{comment.content}</div>
        </div>
      </section>
      {editComment && (
        <CommentsAdd
          setEditComment={setEditComment}
          editComment={editComment}
          commentId={id}
          content={comment.content}
        ></CommentsAdd>
      )}
      {reply && (
        <ReplyAdd
          commentId={index}
          username={comment.user.username}
          setIsReply={setIsReply}
        ></ReplyAdd>
      )}
      {comment.replies.length > 0 && (
        <div className="pl-10 max-md:pl-0">
          <section className="flex flex-col gap-5 pl-10 max-md:pl-4 border-l-2">
            {comment.replies.map((reply) => {
              return (
                <CommentsReply
                  key={reply.id}
                  commentId={index}
                  replyId={reply.id}
                  reply={reply}
                ></CommentsReply>
              );
            })}
          </section>
        </div>
      )}
    </>
  );
};

export default CommentsCard;
