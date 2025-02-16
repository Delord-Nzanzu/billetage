import { View, Text } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

const SelectNonMultiple = ({
  data,
  setSelected,
  selectItem,
  placeholder,
  label,
}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "monst-r",
        //   fontSize: 18,
        marginBottom:5,marginLeft:10
        }}>
        {label}
      </Text>
      <SelectList
        setSelected={setSelected}
        data={data}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SelectNonMultiple;
