import * as React from "react";
import Select from "react-select";
import { categories } from "../constants/sampleData";

interface Props {
  appliedCategoryFilters: CategoryFilter[];
  onCategoryChange: (appliedCategoryFilters: CategoryFilter[]) => void;
}

const CategorySearchBar: React.FC<Props> = (props) => {
  function handleChange(object: CategoryFilter[]) {
    console.log(object);
    props.onCategoryChange(object);
  }
  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      placeholder="Search by category..."
      options={categories}
      className="category-search-bar"
      value={props.appliedCategoryFilters}
      onChange={(value) => handleChange(value as CategoryFilter[])}
    ></Select>
  );
};

export default CategorySearchBar;
