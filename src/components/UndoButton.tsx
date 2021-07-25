import * as React from "react";

interface Props {
  disabled: boolean;
  onUndo: () => void;
}

const UndoButton: React.FC<Props> = (props) => {
  return (
    <div className="undo-button-wrapper">
      <button
        className="undo-button"
        disabled={props.disabled}
        onClick={props.onUndo}
      >
        Undo
      </button>
    </div>
  );
};

export default UndoButton;
