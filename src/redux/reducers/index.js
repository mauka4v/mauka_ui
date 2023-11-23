export * from "./watchlist";

export const handleSignalFilters = (activeFilters, payload) => {
  /*
    Handles Payload to update filters
    Paras:
      Action:  Add/Remove
      Value: value to add/remove to/from filter resp.
    Returns : list of dictionary with filters
       {column_name: filter}
    */
  const { field, value } = payload;
  if (value === "") {
    return activeFilters.filter((item) => item.field !== field);
  }
  let newFilters = [];
  if (activeFilters.length === 0) {
    return [payload];
  } else {
    let existingField = false;
    newFilters = activeFilters.map((item) => {
      if (item.field === field) {
        const newItem = { field, value: value.replaceAll(" ", "").split(",") };
        existingField = true;
        return newItem;
      }
      return item;
    });
    return !existingField
      ? [
          ...activeFilters,
          { field, value: value.replaceAll(" ", "").split(",") },
        ]
      : newFilters;
  }
};
