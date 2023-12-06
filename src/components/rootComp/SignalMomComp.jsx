import React, { useCallback, useState } from "react";
import { getMomentumData } from "../../api/maukaApi";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { clearSignalFilters } from "../../redux/reducers";
import MomentumTable from "../momentum/MomentumTable";
import Filters from "../signal/Filters";
import { FormControl, Box, Button, HStack } from "@chakra-ui/react";
import { isListEmpty, isObjEmpty } from "../../common";

import { momentumColumns } from "../../common/momentum";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

function SignalMomentum(props) {
  const { Index, Active } = props;
  const store = useSelector((state) => state.watchList);
  const { signalFilters } = store;
  const watchList = store.watchList || ["NVDA"];
  const [input, setInput] = useState("");
  const [tableData, setTableData] = useState({});
  const [clearFilter, setClearFilter] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [signalData, setSignalData] = useState();
  const [period, setPeriod] = useState(store.period);
  const [filterValue, setFilterValue] = useState(() => "");
  const [filteredRowData, setFilteredRowData] = useState([]);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);

  const applySignalFilters = () => filterMulti(signalData, signalFilters, 1);

  const PagingComp = (props) => (
    <Flex>
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => setPageNumber(1)}
            isDisabled={pageNumber === 1}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={3}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={() => decrementPage()}
            isDisabled={pageNumber <= 1}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
        <Box p={1} mt={1}>
          Page {pageNumber} / {pageCount}
        </Box>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => incrementPage()}
            isDisabled={pageNumber === pageCount}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => setPageNumber(pageCount)}
            isDisabled={pageNumber === pageCount}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={3}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );

  const changePageLimit = (n) => setPageLimit(n);
  const incrementPage = () => setPageNumber(pageNumber + 1);
  const decrementPage = () => setPageNumber(pageNumber - 1);
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
      const rowStartIdx = page === 1 ? 0 : (page - 1) * pageLimit + 1;
      const rowEndIdx = page === 1 ? 100 : page * pageLimit + 1;
      setFilteredRowData(filteredData.slice(rowStartIdx, rowEndIdx));
      setPageCount(Math.ceil(filteredData.length / pageLimit));
    },
    [signalFilters]
  );

  const filterUsingMap = (data, filterMap) => {
    const { field, value } = filterMap;
    const filteredRows = data.filter((dataMap) =>
      value.includes(dataMap[field])
    );

    return filteredRows;
  };

  async function fetchData() {
    // Fetch Data from DB
    const signalDataResp = await getMomentumData();
    if (isListEmpty(signalDataResp)) {
      setSignalData([]);
      return 0;
    }
    signalDataResp && setSignalData(signalDataResp);
    setPageCount(Math.ceil(signalDataResp.length / pageLimit));
  }

  React.useEffect(() => {
    // Fetch Data only when Signal tab is Active
    if (Active === Index && signalData === undefined) {
      fetchData();
    }
    !isListEmpty(signalData) &&
      filterMulti(signalData, signalFilters, pageNumber);
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
          {/* <TablePaging
            PageCount={signalData !== undefined ? signalData.length : 0}
            PageIndex={pageNumber}
            IncrementPage={incrementPage}
            DecrementPage={decrementPage}
            ChangePageLimit={changePageLimit}
            ChangePageIndex={setPageNumber}
          /> */}
          <HStack spacing="24px">
            <Filters IsClearValue={clearFilter} SignalConf={momentumColumns} />
            <Button variant="brandPrimary" onClick={applySignalFilters}>
              Apply Filter
            </Button>
            <Button onClick={handleClearFilter}>Clear Filter</Button>
            <PagingComp />
          </HStack>
        </FormControl>
      </Box>

      {signalData !== undefined && !isObjEmpty(signalData) && (
        <MomentumTable
          Data={filteredRowData}
          Filter={signalFilters}
          PageNumber={pageNumber}
          PageLimit={pageLimit}
        />
      )}
    </Box>
  );
}

export default SignalMomentum;
