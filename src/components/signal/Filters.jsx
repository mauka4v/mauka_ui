import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import ComboBoxFilter from "./ComboBoxFilter";

function Filters(props) {
  const { IsClearValue, SignalConf } = props;

  const inputBox = (name) => <FilterInput Name={name} IsClear={IsClearValue} />;
  const selectBox = (name, options, title) => (
    <ComboBoxFilter
      Name={name}
      Options={options}
      IsClearValue={IsClearValue}
      Title={title}
    />
  );
  const filterElementMap = {
    select: (name, options, title) => selectBox(name, options, title),
    input: (name) => inputBox(name),
  };

  const filterElemets = [];
  SignalConf.map(
    (signal) =>
      signal.isFilter &&
      filterElemets.push(
        filterElementMap[signal.type](signal.name, signal.options, signal.title)
      )
  );
  return <>{filterElemets}</>;
}

export default Filters;
