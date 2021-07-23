import "./App.css";
import Organizer from "./components/Organizer";
import { samplePostIts2 } from "./constants/sampleData";
import { samplePostIts1 } from "./constants/sampleData";
import Masonry from "react-masonry-css";
import PostItNote from "./components/PostItNote";
import * as React from "react";
import FilterBar from "./components/FilterBar";
import CategorySearchBar from "./components/CategorySearchBar";

function App() {
  /**
   * TODO: Add empty state (illustration when there is no sticky)
   * TODO: Add loading state (when adding new sticky)
   * TODO: Remove single sticky
   * TODO: Remove all sticky
   */

  const [tasks, setTasks] = React.useState(samplePostIts2);
  const [appliedCategoryFilters, setAppliedCategoryFilters] = React.useState<
    CategoryFilter[]
  >([]);
  const [sortedBy, setSortedBy] = React.useState("alphabetical");
  const [filterBy, setFilterBy] = React.useState("show");
  const breakpointForMasonryLayout = {
    default: 5,
    1100: 3,
    700: 3,
    500: 2,
    300: 1,
  };

  function hideCompletedTasks(array: PostItNoteData[]) {
    const newFilteredArrayWithNoCompletedTasks = [...array].filter(
      (a) => a.isCompleted == false
    );
    return newFilteredArrayWithNoCompletedTasks;
  }

  function showCompletedTasks(array: PostItNoteData[]) {
    return array;
  }

  function sortedByAlphabetical(array: PostItNoteData[]) {
    const newSortedArrayByAlphabetical = [...array].sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
    return newSortedArrayByAlphabetical;
  }

  function sortedByCategory(array: PostItNoteData[]) {
    const newSortedArrayByCategory = [...array].sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    );
    return newSortedArrayByCategory;
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

  /**
   * Map the sort selection to the function to sort by
   */

  const sortSelectionToSortFnMap: Record<
    string,
    (array: PostItNoteData[]) => PostItNoteData[]
  > = {
    alphabetical: sortedByAlphabetical,
    category: sortedByCategory,
    "time-created": sortedByTimeCreated,
  };

  const sortFunction = sortSelectionToSortFnMap[sortedBy];

  const sortedPostIts = sortFunction(tasks);

  const filteredSelectionToFilterFunction: Record<
    string,
    (array: PostItNoteData[]) => PostItNoteData[]
  > = {
    hide: hideCompletedTasks,
    show: showCompletedTasks,
  };

  const filterFunction = filteredSelectionToFilterFunction[filterBy];

  const filteredPostIts = filterFunction(sortedPostIts);

  /**
   * Filter by Category
   */

  const setOfAppliedCategoryFilters = new Set(
    appliedCategoryFilters.map((el) => el.value)
  );

  const postItsFilteredByCategory =
    setOfAppliedCategoryFilters.size > 0
      ? filteredPostIts.filter((el) => {
          /**
           * If this post-it's category matches any of the applied category filters, keep it
           */

          return setOfAppliedCategoryFilters.has(el.category);
        })
      : filteredPostIts;

  return (
    <div className="App">
      <h1 className="app-name">Bulletin Board</h1>
      <div className="app-navigation-center">
        <Organizer sortedBy={(sorter: string) => setSortedBy(sorter)} />
        <CategorySearchBar
          appliedCategoryFilters={appliedCategoryFilters}
          onCategoryCHange={(categories) =>
            setAppliedCategoryFilters(categories)
          }
        />
        <FilterBar filterBy={(filter: string) => setFilterBy(filter)} />
      </div>

      <Masonry
        breakpointCols={breakpointForMasonryLayout}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {postItsFilteredByCategory.map((singlePostItData) => {
          return (
            <PostItNote
              onToggleCompleted={(id) =>
                setTasks((prevTasks) => {
                  const indexToToggle = prevTasks.findIndex(
                    (el) => el.id === id
                  );

                  const arrayClone = [...prevTasks];

                  const taskToToggle = { ...arrayClone[indexToToggle] };

                  taskToToggle.isCompleted = !taskToToggle.isCompleted;

                  arrayClone[indexToToggle] = taskToToggle;

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
