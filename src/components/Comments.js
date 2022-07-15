import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { timestamp } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import Avatar from './Avatar';

const Comments = ({ projectId, project }) => {
  const { updateDoc, response } = useFirestore('projects');
  const [comment, setComment] = useState('');
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommentObj = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: comment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDoc(projectId, {
      comments: [...project.comments, newCommentObj],
    });
    if (!response.error) {
      setComment('');
      console.log(project.comments);
    } else {
      console.log(response.error);
    }
  };
  return (
    <div className="project-comments scrollbar-hide">
      <h4>Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((c) => (
            <li key={c.id}>
              <div className="comment-author flex justify-start gap-2  items-center">
                <Avatar src={c.photoURL} />
                <p> {c.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(c.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">{c.content}</div>
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Say something..: </span>
          <input
            className="comment-input"
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </label>
        <button className="btn bg-slate-700 text-slate-100">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;
