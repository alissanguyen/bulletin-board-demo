import * as React from "react";
import ReactDOM from "react-dom";

interface Props {
  sortedBy: Function;
}

const Organizer: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLElement | null>(null);
  const buttonRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    window.addEventListener("click", (event) => {
      if (inputRef.current) {
        const domNodeForDropdown = ReactDOM.findDOMNode(inputRef.current);

        /**
         * If the user clicked on the button, don't close the dropdown
         */

        if (
          buttonRef.current &&
          buttonRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }

        if (
          domNodeForDropdown &&
          !domNodeForDropdown.contains(event.target as HTMLElement)
        ) {
          setIsOpen(false);
        }
      }
    });
  }, []);

  return (
    <div className="sorted-by-bar">
      <button
        className="sorted-by-button"
        onClick={(e) => {
          setIsOpen((prev) => !prev);
          e.preventDefault();
        }}
        ref={(el) => {
          buttonRef.current = el;
        }}
      >
        Sorted By: Default
      </button>

      <div
        ref={(element) => {
          inputRef.current = element;
        }}
        id="dropdown-menu"
        className={`dropdown-menu-content ${isOpen ? "show" : undefined}`}
      >
        <a
          href="#date"
          onClick={() => {
            setIsOpen((prev) => !prev);
            props.sortedBy("time-created");
          }}
        >
          Time Created
        </a>
        <a
          href="#categories"
          onClick={() => {
            setIsOpen((prev) => !prev);
            props.sortedBy("category");
          }}
        >
          Categories
        </a>
        <a
          href="#alphabetical"
          onClick={() => {
            setIsOpen((prev) => !prev);
            props.sortedBy("alphabetical");
          }}
        >
          Alphabetical
        </a>
      </div>
    </div>
  );
};

export default Organizer;
