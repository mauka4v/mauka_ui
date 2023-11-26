import React, { useState } from "react";
import { getSignalDataForWatchList, getSignalData } from "../../api/maukaApi";
import {
  isTextAllowed,
  UNDEFINED,
  periodButtonConf,
  COLS_TO_PUBLISH,
  isListEmpty,
} from "../../common";
import DataTableComp from "../table";
import { Progress } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import RadioButtons from "../radio";
import { changeInvPeriod } from "../../redux/reducers";
import RemoveTickerBtn from "../removeTicker";
import ResearchButton from "../researchBtn";

import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Button,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

import { addTickerToWatchList } from "../../redux/actions";

function WatchList(props) {
  const { Index, Active } = props;
  const store = useSelector((state) => state.watchList);
  const watchList = store.watchList || [];
  const [input, setInput] = useState("");
  const [tableData, setTableData] = useState({});
  const [isInvalid, setIsInvalid] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [period, setPeriod] = useState(store.period);
  const [userWatchlist, setUserWatchlist] = useState(watchList);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const ticker = e.target.value;
    setInput(ticker);
    setUserWatchlist((prevValue) => [...prevValue, ticker]);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  const onSubmitHandler = async () => {
    if (input) {
      dispatch(addTickerToWatchList({ ticker: input }));
      setInput("");
    }
  };

  const onPeriodChange = (value) => {
    setTableData({});
    dispatch(changeInvPeriod({ period: value }));
    setPeriod(value);
  };

  async function getWatchListData(tickers = []) {
    setIsLoading(true);
    const response = await getSignalDataForWatchList(tickers);
    if (isListEmpty(response)) {
      setIsLoading(false);
      return 0;
    }
    const userWatchListData = response.filter(({ ticker }) =>
      userWatchlist.includes(ticker)
    );
    setIsLoading(false);
    setTableData(userWatchListData);
  }

  React.useEffect(() => {
    console.log("Calling Watchlist for ", watchList);
    if (Index === Active) {
      getWatchListData(watchList);
    }
  }, [watchList, period, Active]);

  return (
    <Box>
      <Box>
        <FormControl isRequired>
          <FormLabel>
            <i>
              *Trends are subject to change on upcoming News, Mergers and
              Earnings!!!
            </i>
          </FormLabel>
          <HStack spacing="24px" mb="1rem">
            <Box w="20vw" h="40px">
              <Input
                isInvalid={isInvalid}
                placeholder="Add Ticker to WatchList"
                value={input}
                onChange={handleInputChange}
                onKeyDown={onKeyDownHandler}
              />
            </Box>
            {/* <Box w="20vw" h="2rem">
              <RadioButtons
                Value={period}
                Params={periodButtonConf}
                OnChange={onPeriodChange}
              />
            </Box> */}
            <Box w="20vw" h="40px">
              <Button
                isLoading={isLoading}
                onClick={onSubmitHandler}
                variant="brandPrimary"
              >
                Submit
              </Button>
            </Box>
          </HStack>
        </FormControl>
      </Box>

      {Object.keys(tableData).length ? (
        <DataTableComp
          TickersData={tableData}
          Columns={COLS_TO_PUBLISH}
          Actions={true}
        />
      ) : (
        <Text> No Watchlist Found !!! </Text>
      )}
    </Box>
  );
}
export default WatchList;
