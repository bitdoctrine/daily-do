import React, { useState } from 'react';
import Avatar from './Avatar';
import { MdOutlineQuickreply } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { AiFillDelete } from 'react-icons/ai';
import { useAuthContext } from '../hooks/useAuthContext';
import { formatDistanceToNow } from 'date-fns';
import CommentForm from './CommentForm';

const Comment = ({
  comment,
  replies,
  handleDelete,
  activeComment,
  setActiveComment,
  addComment,
  parentId = null,
  updateComment,
  handleLike,
}) => {
  const { user } = useAuthContext();
  const fiveMinutes = 900000;
  const timePassed = new Date() - comment.createdAt.toDate() > fiveMinutes;
  const canEdit = user.uid === comment.createdBy && !timePassed;
  const canDelete = user.uid === comment.createdBy && !timePassed;

  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment.commentId;

  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === comment.commentId;

  const replyId = parentId ? parentId : comment.commentId;

  const [isShowReply, setIsShowReply] = useState(false);
  const showText = isShowReply ? 'Hide Replies' : 'Show Replies';

  return (
    <div className="comment">
      <div className="comment-image-container">
        <Avatar src={comment.photoURL} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author ">{comment.displayName}</div>
          <div className="text-slate-500">
            {formatDistanceToNow(comment.createdAt.toDate(), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="comment-text">{comment.content}</div>
        <div className="comment-actions gap-2">
          {user && (
            <>
              <div
                className="comment-action ml-4"
                onClick={() =>
                  setActiveComment({ id: comment.commentId, type: 'replying' })
                }
              >
                <MdOutlineQuickreply />
              </div>
              <div
                className="comment-action comment-action-like ml-4"
                onClick={() => handleLike(comment.commentId)}
              >
                <FcLike />
                <div className="comment-action-likes">
                  {comment.likedBy.length}
                </div>
              </div>
            </>
          )}

          {canEdit && (
            <div
              className="comment-action ml-4"
              onClick={() =>
                setActiveComment({ id: comment.commentId, type: 'editing' })
              }
            >
              <AiFillEdit />
            </div>
          )}

          {canDelete && (
            <div
              className="comment-action ml-4"
              onClick={() => handleDelete(comment.commentId)}
            >
              <AiFillDelete />
            </div>
          )}
        </div>
        {replies.length > 0 && (
          <button
            className="btn bg-slate-500 text-slate-100 my-2 mx-auto p-2"
            onClick={() => setIsShowReply(!isShowReply)}
          >
            {showText}
          </button>
        )}
        {isReplying && (
          <CommentForm
            submitLabel={'Reply'}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {isEditing && (
          <CommentForm
            submitLabel={'Save'}
            hasCancelButton
            initialText={comment.content}
            handleSubmit={(text) => updateComment(text, comment.commentId)}
            handleCancel={() => setActiveComment(null)}
          />
        )}

        {replies.length > 0 && isShowReply && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.commentId}
                replies={[]}
                handleDelete={handleDelete}
                parentId={comment.commentId}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                isShowReply={isShowReply}
                setIsShowReply={setIsShowReply}
                handleLike={handleLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
