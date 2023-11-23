import React, { useCallback, useState } from "react";
import { getTickerData, getSignalData } from "../../api/maukaApi";
import DataTableComp from "../table";
import { Progress, filter } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { clearSignalFilters } from "../../redux/reducers";
import SignalTable from "../signal/SignalTable";
import Filters from "../signal/Filters";
import { FormControl, Box, Button, HStack } from "@chakra-ui/react";

function SignalComp(props) {
  const { Index, Active } = props;
  const store = useSelector((state) => state.watchList);
  const { signalFilters } = store;
  const watchList = store.watchList || ["NVDA"];
  const [input, setInput] = useState("");
  const [tableData, setTableData] = useState({});
  const [clearFilter, setClearFilter] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [signalData, setSignalData] = useState(() => []);
  const [period, setPeriod] = useState(store.period);
  const [filterValue, setFilterValue] = useState(() => "");
  const [filteredRowData, setFilteredRowData] = useState([]);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);

  const applySignalFilters = () => filterMulti(signalData, signalFilters, 1);

  const handleClearFilter = () => {
    dispatch(clearSignalFilters());
    setClearFilter(!clearFilter);
  };

  const filterMulti = useCallback(
    (data, filters, page = 1) => {
      let filteredData = data;
      for (let filterMap of filters) {
        filteredData = filterUsingMap(filteredData, filterMap);
      }
      const rowStartIdx = page === 1 ? 1 : (page - 1) * pageLimit + 1;
      const rowEndIdx = page === 1 ? 101 : page * pageLimit + 1;
      setFilteredRowData(filteredData.slice(rowStartIdx, rowEndIdx));
    },
    [signalFilters]
  );

  const filterUsingMap = (data, filterMap) => {
    const { field, value } = filterMap;
    return data.filter((dataMap) => value.includes(dataMap[field]));
  };

  async function fetchData() {
    // Fetch Data from DB
    const signalDataResp = await getSignalData();
    signalDataResp && setSignalData(signalDataResp);
  }

  React.useEffect(() => {
    // Fetch Data only when Signal tab is Active
    if (Active === Index) {
      signalData.length === 0 && fetchData();
    }
    filterMulti(signalData, signalFilters, 1);
  }, [
    watchList,
    period,
    Active,
    filterValue,
    pageNumber,
    signalFilters,
    signalData,
  ]);

  return (
    <Box>
      <Box>
        <FormControl isRequired>
          <HStack spacing="24px">
            <Filters IsClearValue={clearFilter} />
            <Button variant="brandPrimary" onClick={applySignalFilters}>
              Apply Filter
            </Button>
            <Button onClick={handleClearFilter}>Clear Filter</Button>
          </HStack>
        </FormControl>
      </Box>
      {Object.keys(signalData).length > 0 && (
        <SignalTable Data={filteredRowData} Filter={signalFilters} />
      )}
    </Box>
  );
}
export default SignalComp;
