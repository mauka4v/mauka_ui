import React, { useEffect, useState } from "react";
import { signalColumns } from "../../common/signal";
import { Box, Input } from "@chakra-ui/react";
import FilterInput from "./FilterInput";
import ComboBoxFilter from "./ComboBoxFilter";

function Filters(props) {
  const { IsClearValue } = props;

  const inputBox = (name) => <FilterInput Name={name} IsClear={IsClearValue} />;
  const selectBox = (name, options) => (
    <ComboBoxFilter Name={name} Options={options} IsClearValue={IsClearValue} />
  );
  const filterElementMap = {
    select: (name, options) => selectBox(name, options),
    input: (name) => inputBox(name),
  };

  const filterElemets = [];
  signalColumns.map(
    (signal) =>
      signal.isFilter &&
      filterElemets.push(
        filterElementMap[signal.type](signal.name, signal.options)
      )
  );
  return <>{filterElemets}</>;
}

export default Filters;
