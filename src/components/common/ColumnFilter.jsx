import { Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSignalFilters } from "../../redux/reducers";

function ColumnFilter(props) {
  const { ColumnName } = props;
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const fieldValue = event.target.value;
    dispatch(
      setSignalFilters({
        field: ColumnName,
        value: fieldValue.replace(" ", "").split(","),
      })
    );
    setValue(fieldValue);
  };

  return (
    <Input
      placeholder="Apply Filter"
      size="sm"
      onChange={handleChange}
      value={value}
      _placeholder={{ color: "brand.800" }}
    ></Input>
  );
}

export default ColumnFilter;
