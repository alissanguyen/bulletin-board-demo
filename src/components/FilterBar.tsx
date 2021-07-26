import * as React from "react";
import Select from "react-select";

interface Props {
    filterBy: Function,
}

const FilterBar: React.FC<Props> = (props) => {

    function handleChange(object: any) {
        props.filterBy(object.value)
    }
  const options = [
    { value: "hide", label: "Hide completed tasks" },
    {
      value: "show",
      label: "Show completed tasks",
    },
  ];
  return (
    <Select
      className="filter-bar"
      placeholder="Filtered by..."
      options={options}
      onChange={(value) => handleChange(value)}
    ></Select>
  );
};

export default FilterBar;
