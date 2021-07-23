import * as React from "react";
import Select from "react-select";
import { categories } from "../constants/sampleData";

interface Props {
  appliedCategoryFilters: CategoryFilter[];
  onCategoryCHange: (appliedCategoryFilters: CategoryFilter[]) => void;
}

const CategorySearchBar: React.FC<Props> = (props) => {
  function handleChange(object: CategoryFilter[]) {
    console.log(object);
    props.onCategoryCHange(object);
    // var arrayOfCatogeries: string[] = [];

    // object.forEach((element: { value: string }) =>
    //   arrayOfCatogeries.push(element.value)
    // );

    // console.log(arrayOfCatogeries);
    // updateCategories(arrayOfCatogeries);

    // on
  }

  function updateCategories(array: string[]) {
    // props.categorizedBy(array);
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
