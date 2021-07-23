import * as React from "react";
import * as faker from "faker";
import Select from "react-select";
import { categories } from "../constants/sampleData";

interface Props {
  handleNewSticky: (newStickyData: PostItNoteData) => void;
}

const AddStickyButton: React.FC<Props> = (props) => {
  const [openForm, setOpenForm] = React.useState(false);
  const [titleChange, setTitleChange] = React.useState("");
  const [descriptionChange, setDescriptionChange] = React.useState("");
  const [category, setCategory] = React.useState("");

  function handleSubmitNewSticky() {
    const newPostItNoteObject = {
      id: faker.datatype.uuid(),
      title: titleChange,
      description: descriptionChange,
      createdAtMillis: new Date(),
      isCompleted: false,
      category: category,
    };
    console.log(newPostItNoteObject);
    props.handleNewSticky(newPostItNoteObject);
  }

  return (
    <div>
      <button
        className="add-new-sticky-button"
        onClick={() => setOpenForm(true)}
      >
        Add new
      </button>
      {openForm ? (
        <div className={openForm ? "add-new-sticky-form-wrapper" : ""}>
          <form
            className="add-new-sticky-form"
            onSubmit={function () {
              handleSubmitNewSticky();
              setOpenForm(false);
            }}
          >
            <label htmlFor="title" className="new-sticky-title">
              Title
            </label>
            <input
              type="text"
              placeholder="Title..."
              required
              onChange={(e) => setTitleChange(e.target.value)}
            />
            <label htmlFor="description" className="new-sticky-description">
              Description
            </label>
            <textarea
              id="new-sticky-description"
              placeholder="Description..."
              onChange={(e) => setDescriptionChange(e.target.value)}
              required
            />
            <Select
              closeMenuOnSelect={true}
              placeholder="Select category..."
              options={categories}
              className="category-select-bar"
              onChange={(el: any) => setCategory(el.value)}
            />
            <button type="submit" className="submit-add-sticky-button">
              Submit
            </button>
            <button
              className="cancle-add-sticky-button"
              onClick={() => setOpenForm(false)}
            >
              Cancle
            </button>
            
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default AddStickyButton;
