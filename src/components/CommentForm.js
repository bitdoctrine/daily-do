import React, { useState } from 'react';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = '',
}) => {
  const [text, setText] = useState(initialText);
  const emptyCommentBox = text.length === 0;

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText('');
  };
  return (
    <div>
      <form onSubmit={submit}>
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="comment-form-button cursor-pointer  bg-slate-700"
          disabled={emptyCommentBox}
        >
          {submitLabel}
        </button>

        {hasCancelButton && (
          <button
            className="comment-form-button comment-form-cancel-button"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
