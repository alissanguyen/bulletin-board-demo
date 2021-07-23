import * as React from "react";

interface Props extends PostItNoteData {
  onToggleCompleted: (id: string) => void;
  removeTargetSticky: (id: string) => void;
}

const PostItNote: React.FC<Props> = (props) => {
  const [cursorIsHover, setCursorIsHover] = React.useState(false);
  
  function updateCompletion() {
    props.onToggleCompleted(props.id);
  }

  function removePostIt() {
    props.removeTargetSticky(props.id);
  }

  return (
    <div
      className={
        !props.isCompleted ? "post-it-wrapper" : "post-it-wrapper-completed"
      }
      onMouseOver={() => setCursorIsHover(true)}
      onMouseLeave={() => setCursorIsHover(false)}
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
      {cursorIsHover ? <button className="remove-post-it-button" onClick={() => removePostIt()}>Remove</button> : null}
    </div>
  );
};

export default PostItNote;
