import { Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSignalFilters } from "../../redux/reducers";

function ComboBoxFilter(props) {
  const { Options, Name, IsClearValue } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const changedValue = e.target.value;
    setValue(changedValue);
    dispatch(setSignalFilters({ field: Name, value: changedValue }));
  };

  const optionElements = () =>
    Options.map((value, idx) => (
      <option key={idx} name={Name} value={value}>
        {value}
      </option>
    ));

  useEffect(() => setValue(""), [IsClearValue]);

  return (
    <Select
      width="10rem"
      size="md"
      placeholder="Message Type Filter"
      onChange={handleChange}
      value={value}
    >
      {optionElements()}
    </Select>
  );
}

export default ComboBoxFilter;
