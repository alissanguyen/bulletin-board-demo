import * as React from "react";

interface Props extends PostItNoteData {
  onToggleCompleted: (id: string) => void;
}

const PostItNote: React.FC<Props> = (props) => {
  function updateCompletion() {
    props.onToggleCompleted(props.id);
  }

  return (
    <div
      className={
        !props.isCompleted ? "post-it-wrapper" : "post-it-wrapper-completed"
      }
    >
      <h3 className="post-it-title">{props.title}</h3>
      <p className="post-it-description">{props.description}</p>
      <p className="post-it-category">Category: {props.category}</p>
      <p className="post-it-created-time">
        Created on {props.createdAtMillis.toLocaleString()}
      </p>
      <input
        type="checkbox"
        className="post-it-checkbox"
        onChange={() => updateCompletion()}
        checked={props.isCompleted}
      />
    </div>
  );
};

export default PostItNote;
