import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import './Comments.css';
import { timestamp } from '../firebase/config';
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ project, projectId }) => {
  const { user } = useAuthContext();
  const { updateDoc, response } = useFirestore('projects');
  const [activeComment, setActiveComment] = useState(null);

  const getReplies = (commentId) =>
    project.comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());

  const addComment = async (text, parentId = null) => {
    const newCommentObj = {
      createdBy: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: text,
      createdAt: timestamp.fromDate(new Date()),
      commentId: uuidv4(),
      parentId,
      likedBy: [],
    };

    setActiveComment(null);

    await updateDoc(projectId, {
      comments: [newCommentObj, ...project.comments],
    });

    if (response.error) console.log(response.error);
  };

  //delete comment function
  const deleteComment = async (id) => {
    const filteredComments = project.comments.filter(
      (comment) => comment.commentId !== id
    );
    try {
      if (window.confirm('Delete this comment ?')) {
        await updateDoc(projectId, { comments: [...filteredComments] });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateComment = async (text, commentId) => {
    const updatedCommentList = project.comments.map((x) => {
      if (x.commentId === commentId) {
        return { ...x, content: text };
      }
      return x;
    });
    if (window.confirm('Update this Post?')) {
      updateDoc(projectId, { comments: [...updatedCommentList] });
    }
    setActiveComment(null);
  };

  const rootComments = project.comments.filter(
    (comment) => comment.parentId === null
  );

  const handleLike = async (commentId) => {
    const updatedCommentList = project.comments.map((comment) => {
      if (comment.commentId === commentId) {
        if (comment.likedBy?.includes(user.uid)) {
          return comment;
        } else {
          comment.likedBy.push(user.uid);
        }
      }
      return comment;
    });

    try {
      await updateDoc(projectId, { comments: [...updatedCommentList] });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="comments overflow-y-scroll scrollbar-hide max-h-[80vh]">
      <h3 className="comments-title">Project Comments</h3>
      <div className="comment-form-title">Write a Comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments &&
          rootComments.length > 0 &&
          rootComments.map((comment) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              replies={getReplies(comment.commentId)}
              user={user}
              handleDelete={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              updateComment={updateComment}
              handleLike={handleLike}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
