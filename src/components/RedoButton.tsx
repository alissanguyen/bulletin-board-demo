import * as React from "react";

interface Props {
  disabled: boolean;
  onRedo: () => void;
}

const RedoButton: React.FC<Props> = (props) => {
  return (
    <div className="redo-button-wrapper">
      <button
        className="redo-button"
        disabled={props.disabled}
        onClick={props.onRedo}
      >
        Redo
      </button>
    </div>
  );
};

export default RedoButton;
