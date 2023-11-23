import React, { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSignalFilters } from "../../redux/reducers";
import { useSelector } from "react-redux";
function FilterInput(props) {
  const store = useSelector((state) => state.watchList);
  const { Name, IsClear } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
    dispatch(setSignalFilters({ field: Name, value: value }));
  };

  useEffect(() => setValue(""), [IsClear]);

  return (
    <Box p="0.5rem">
      <Input
        placeholder={`Apply filter on ${Name}`}
        value={value}
        name={Name}
        onChange={(e) => handleInputChange(e)}
      />
    </Box>
  );
}

export default FilterInput;
