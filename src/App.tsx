import "./App.css";
import Organizer from "./components/Organizer";
import { samplePostIts2 } from "./constants/sampleData";
import Masonry from "react-masonry-css";
import PostItNote from "./components/PostItNote";
import * as React from "react";
import FilterBar from "./components/FilterBar";
import CategorySearchBar from "./components/CategorySearchBar";
import EmptyState from "./components/EmptyState";
import AddPostItButton from "./components/AddPostItButton";
import { useStateWithHistory } from "./hooks/useStateWithHistory";
import UndoButton from "./components/UndoButton";
import RedoButton from "./components/RedoButton";

function App() {
  /**
   * TODO: Edit single post-it
   * TODO: Implement user authentication
   * TODO: Add loading state (when adding new post-it)
   */

  // States section-----------------------------------------------------------------

  const [
    postItMasterList,
    setPostItMasterList,
    undo,
    undoIsPossible,
    redo,
    redoIsPossible,
  ] = useStateWithHistory<PostItNoteData[]>(samplePostIts2);

  const [appliedCategoryFilters, setAppliedCategoryFilters] = React.useState<
    CategoryFilter[]
  >([]);
  const [sortedBy, setSortedBy] = React.useState("alphabetical");
  const [filterBy, setFilterBy] = React.useState("show");

  // Masonry section-----------------------------------------------------------------
  const breakpointForMasonryLayout = {
    default: 5,
    1100: 3,
    700: 3,
    500: 2,
    300: 1,
  };

  // Filter by completion-----------------------------------------------------------------
  function hideCompletedPostIts(array: PostItNoteData[]) {
    const newFilteredArrayWithNoCompletedPostIts = [...array].filter(
      (a) => a.isCompleted === false
    );
    return newFilteredArrayWithNoCompletedPostIts;
  }

  function showCompletedPostIts(array: PostItNoteData[]) {
    return array;
  }

  // Add new post-it section-----------------------------------------------------------------
  function addNewPostIts(newData: PostItNoteData) {
    setPostItMasterList((prevPostIts) => {
      const postItsClone = [...prevPostIts];

      postItsClone.push(newData);
      return postItsClone;
    });
  }

  // Post-it sort section-----------------------------------------------------------------
  function sortedByCategory(array: PostItNoteData[]) {
    const newSortedArrayByCategory = [...array].sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    );
    return newSortedArrayByCategory;
  }


  function sortedByAlphabetical(array: PostItNoteData[]) {
    const newSortedArrayByAlphabetical = [...array].sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
    return newSortedArrayByAlphabetical;
  }
  function sortedByTimeCreated(array: PostItNoteData[]) {
    const newSortedArrayByTimeCreated = [...array].sort((a, b) =>
      a.createdAtMillis.getTime() > b.createdAtMillis.getTime()
        ? 1
        : b.createdAtMillis.getTime() > a.createdAtMillis.getTime()
        ? -1
        : 0
    );
    return newSortedArrayByTimeCreated;
  }

  // Map the sort selection to the function to sort by
  const sortSelectionToSortFnMap: Record<
    string,
    (array: PostItNoteData[]) => PostItNoteData[]
  > = {
    alphabetical: sortedByAlphabetical,
    category: sortedByCategory,
    "time-created": sortedByTimeCreated,
  };

  const sortFunction = sortSelectionToSortFnMap[sortedBy];

  const sortedPostIts = sortFunction(postItMasterList);

  // Filter by Category-----------------------------------------------------------------
  const filteredSelectionToFilterFunction: Record<
    string,
    (array: PostItNoteData[]) => PostItNoteData[]
  > = {
    hide: hideCompletedPostIts,
    show: showCompletedPostIts,
  };

  const filterFunction = filteredSelectionToFilterFunction[filterBy];

  const filteredPostIts = filterFunction(sortedPostIts);

  const setOfAppliedCategoryFilters = new Set(
    appliedCategoryFilters.map((el) => el.value)
  );

  const postItsFilteredByCategory =
    setOfAppliedCategoryFilters.size > 0
      ? filteredPostIts.filter((el) => {
          // If this post-it's category matches any of the applied category filters, keep it
          return setOfAppliedCategoryFilters.has(el.category);
        })
      : filteredPostIts;

  // Return components section-----------------------------------------------------------------
  function handleRemoveAll() {
    setPostItMasterList([]);
  }

  // Return components section-----------------------------------------------------------------
  return (
    <div className="App">
      <h1 className="app-name">Bulletin Board</h1>
      <div className="app-navigation-center">
        <Organizer sortedBy={(sorter: string) => setSortedBy(sorter)} />
        <AddPostItButton
          handleNewPostIt={(data: PostItNoteData) => addNewPostIts(data)}
        />
        <UndoButton disabled={!undoIsPossible} onUndo={undo} />
        <RedoButton disabled={!redoIsPossible} onRedo={redo} />
        <CategorySearchBar
          appliedCategoryFilters={appliedCategoryFilters}
          onCategoryChange={(categories) =>
            setAppliedCategoryFilters(categories)
          }
        />
        <button className="remove-all-button" onClick={() => handleRemoveAll()}>
          Remove all
        </button>
        <FilterBar filterBy={(filter: string) => setFilterBy(filter)} />
      </div>
      <div className="empty-state-wrapper">
        {postItMasterList.length === 0 ? <EmptyState /> : null}
      </div>

      <Masonry
        breakpointCols={breakpointForMasonryLayout}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {postItsFilteredByCategory.map((singlePostItData) => {
          return (
            <PostItNote
              onEditPostIt={(editedPostIt) => {
                setPostItMasterList((prev) => {
                  const indexToUpdate = prev.findIndex(
                    (el) => el.id === editedPostIt.id
                  );

                  if (indexToUpdate >= 0) {
                    const arrayClone = [...prev];

                    arrayClone[indexToUpdate] = editedPostIt;

                    return arrayClone;
                  } else {
                    return prev;
                  }
                });
              }}
              removeTargetPostIt={(id) =>
                setPostItMasterList((prevPostIts) => {
                  const indexToRemove = prevPostIts.findIndex(
                    (el) => el.id === id
                  );

                  const arrayCopied = [...prevPostIts];
                  arrayCopied.splice(indexToRemove, 1);

                  return arrayCopied;
                })
              }
              onToggleCompleted={(id) =>
                setPostItMasterList((prevPostIts) => {
                  const indexToToggle = prevPostIts.findIndex(
                    (el) => el.id === id
                  );

                  const arrayClone = [...prevPostIts];

                  const postItsToToggle = { ...arrayClone[indexToToggle] };

                  postItsToToggle.isCompleted = !postItsToToggle.isCompleted;

                  arrayClone[indexToToggle] = postItsToToggle;

                  return arrayClone;
                })
              }
              key={singlePostItData.id}
              {...singlePostItData}
            />
          );
        })}
      </Masonry>
    </div>
  );
}

export default App;
