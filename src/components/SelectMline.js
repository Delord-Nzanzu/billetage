import React from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const SelectMultiline = ({
  data,
  setSelected,
  selectItem,
  placeholder,
  label,
}) => {
  return (
    <MultipleSelectList
      setSelected={setSelected}
      data={data}
      placeholder={placeholder}
      label={label}
      labelStyles={{
        fontFamily:"monst-r"
      }}
    />
  );
};

export default SelectMultiline;
