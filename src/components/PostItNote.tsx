import * as React from "react";
import Select from "react-select";
import { categories } from "../constants/sampleData";

interface Props extends PostItNoteData {
  onToggleCompleted: (id: string) => void;
  removeTargetPostIt: (id: string) => void;
  onEditPostIt: (editedPostIt: PostItNoteData) => void;
}

const PostItNote: React.FC<Props> = (props) => {
  const [cursorIsHover, setCursorIsHover] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  function updateCompletion() {
    props.onToggleCompleted(props.id);
  }

  function removePostIt() {
    props.removeTargetPostIt(props.id);
  }

  const handleEditPostIt = (editedPostIt: PostItNoteData) => {
    props.onEditPostIt(editedPostIt);
  };

  return (
    <div
      className={
        !props.isCompleted ? "post-it-wrapper" : "post-it-wrapper-completed"
      }
      onMouseOver={() => setCursorIsHover(true)}
      onMouseLeave={() => setCursorIsHover(false)}
    >
      {isEditing ? (
        <EditingPostItNoteDisplay
          originalPostItNote={props}
          onFinishEditing={handleEditPostIt}
          onRemovePostIt={() => removePostIt()}
          onHandleCancleEditing={() => setIsEditing(false)}
        />
      ) : (
        <NonEditingPostItNoteDisplay
          {...props}
          onToggleCompleted={updateCompletion}
          onStartEdit={() => setIsEditing(true)}
          cursorIsHover={cursorIsHover}
          onRemove={removePostIt}
        />
      )}
    </div>
  );
};

interface EditingProps {
  onRemovePostIt: () => void;
  onHandleCancleEditing: () => void;
  onFinishEditing: (stagedPostItNode: PostItNoteData) => void;
}

const EditingPostItNoteDisplay: React.FC<
  {
    originalPostItNote: PostItNoteData;
  } & EditingProps
> = (props) => {
  /**
   * The source of truth for all changes the user makes to the editing post it
   */
  const [stagedPostItNote, setStagedPostItNote] = React.useState(
    props.originalPostItNote
  );

  const handleEditStagedPostItNoteField =
    (key: keyof PostItNoteData) => (value: any) => {
      setStagedPostItNote((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    };

  function handleFinishedEditing() {
    props.onFinishEditing(stagedPostItNote);
    props.onHandleCancleEditing();
  }

  function handleCancelEditing() {
    props.onHandleCancleEditing();
  }

  function removePostIt() {
    props.onRemovePostIt();
  }

  return (
    <div className="post-it-editing-form-wrapper">
      <div className="editing-form-wrapper">
        <label htmlFor="title-input-editing" className="title-editing-label">
          Title
        </label>
        <input
          className="post-it-title-input-editing"
          value={stagedPostItNote.title}
          id="title-input-editing"
          onChange={(e) =>
            handleEditStagedPostItNoteField("title")(e.target.value)
          }
        />
        <label
          htmlFor="description-input-editing"
          className="description-editing-label"
        >
          Description
        </label>
        <textarea
          className="post-it-description-input-editing"
          value={stagedPostItNote.description}
          id="description-input-editing"
          onChange={(e) =>
            handleEditStagedPostItNoteField("description")(e.target.value)
          }
        />
        <Select
          closeMenuOnSelect={true}
          // placeholder="Pick a category..."
          value={{
            label: stagedPostItNote.category,
            value: stagedPostItNote.category,
          }}
          options={categories}
          className="category-editing-bar"
          onChange={(el) => {
            if (el !== null) {
              handleEditStagedPostItNoteField("category")(el.value);
            }
          }}
        />
      </div>
      <input
        type="checkbox"
        className="post-it-checkbox"
        checked={stagedPostItNote.isCompleted}
      />
      <div className="remove-and-finish-and-cancel-editing-wrapper">
        <div className="editing-remove-post-it-button-wrapper">
          <button
            className="editing-remove-post-it-button"
            onClick={() => removePostIt()}
          >
            Remove
          </button>
        </div>
        <div className="finish-editing-button-wrapper">
          <button
            className="finish-editing-button"
            onClick={() => handleFinishedEditing()}
          >
            Finish
          </button>
        </div>
        <div className="cancel-editing-button-wrapper">
          <button
            className="cancel-editing-button"
            onClick={() => handleCancelEditing()}
          >
            Cancel editing
          </button>
        </div>
      </div>
    </div>
  );
};

interface NonEditingProps {
  cursorIsHover: boolean;
  onStartEdit: () => void;
  onRemove: () => void;
}

const NonEditingPostItNoteDisplay: React.FC<Props & NonEditingProps> = (
  props
) => {
  return (
    <>
      <h3 className="post-it-title">{props.title}</h3>
      <p className="post-it-description">{props.description}</p>
      <p className="post-it-category">Category: {props.category}</p>
      <p className="post-it-created-time">
        Created on {props.createdAtMillis.toLocaleString()}
      </p>
      <input
        type="checkbox"
        className="post-it-checkbox"
        onChange={() => props.onToggleCompleted(props.id)}
        checked={props.isCompleted}
      />
      {props.cursorIsHover ? (
        <div className="remove-button-and-edit-button-wrapper">
          <div className="remove-post-it-button-wrapper">
            <button
              className="remove-post-it-button"
              onClick={() => props.onRemove()}
            >
              Remove
            </button>
          </div>
          <div className="edit-button-wrapper">
            <button className="edit-button" onClick={props.onStartEdit}>
              Edit
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostItNote;
