import React, { useState } from "react";
import { getSignalDataForWatchList, getSignalData } from "../../api/maukaApi";
import {
  isTextAllowed,
  UNDEFINED,
  periodButtonConf,
  COLS_TO_PUBLISH,
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
  const [signalData, setSignalData] = useState([]);
  const [period, setPeriod] = useState(store.period);
  const [userWatchlist, setUserWatchlist] = useState([
    "NVDA",
    "AMZN",
    "RIVN",
    "NFLX",
  ]);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const ticker = e.target.value;
    setInput(ticker);
    setUserWatchlist((prevValue) => [...prevValue, ticker]);
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
    const response = await getSignalDataForWatchList(tickers);
    const userWatchListData = response.filter(({ ticker }) =>
      userWatchlist.includes(ticker)
    );
    setTableData(userWatchListData);
    return userWatchListData;
  }

  React.useEffect(() => {
    if (Index === Active) {
      getWatchListData([]);
    }
  }, [userWatchlist, period, Active]);

  return (
    <Box>
      <Box>
        <i>
          *Trends are subject to change on upcoming News, Mergers and
          Earnings!!!
        </i>
        <FormControl isRequired>
          <FormLabel>Watch List</FormLabel>
          <HStack spacing="24px">
            <Box w="50vw" h="40px">
              <Input
                isInvalid={isInvalid}
                placeholder="Add Ticker to WatchList"
                value={input}
                onChange={handleInputChange}
              />
            </Box>
            <Box w="20vw" h="2rem">
              <RadioButtons
                Value={period}
                Params={periodButtonConf}
                OnChange={onPeriodChange}
              />
            </Box>
            <Box w="20vw" h="40px">
              <Button
                isLoading={isLoading}
                onClick={onSubmitHandler}
                variant="brandPrimary"
              >
                {" "}
                Submit
              </Button>
            </Box>
          </HStack>
        </FormControl>
      </Box>

      {Object.keys(tableData).length > 0 ? (
        <DataTableComp
          TickersData={tableData}
          Columns={COLS_TO_PUBLISH}
          Actions={true}
        />
      ) : (
        <Progress size="xs" isIndeterminate />
      )}
    </Box>
  );
}
export default WatchList;
