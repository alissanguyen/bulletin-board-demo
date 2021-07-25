import * as React from "react";

interface Props {
  undoActionFormReply: (data: string) => void;
}

const UndoActionForm: React.FC<Props> = (props) => {
  function handleUndoButtonClicked(value: string) {
    props.undoActionFormReply(value);
  }

  return (
    <div className="undo-action-form-wrapper">
      <p className="undo-action-form-description">Undo action?</p>
      <button
        className="undo-action-form-yes-button"
        onClick={() => handleUndoButtonClicked("yes")}
      >
        Yes
      </button>
      <button
        className="undo-action-form-no-button"
        onClick={() => handleUndoButtonClicked("no")}
      >
        No
      </button>
    </div>
  );
};

export default UndoActionForm;
