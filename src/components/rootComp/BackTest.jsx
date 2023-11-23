import React, { useState } from "react";
import { getBackTestData } from "../../api/maukaApi";
import { isTextAllowed, UNDEFINED, periodButtonConf } from "../../common";
import DataTableComp from "../table";
import { Progress, Text, Textarea } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import RadioButtons from "../radio";
import { changeInvPeriod } from "../../redux/reducers";
import RemoveTickerBtn from "../removeTicker";
import ResearchButton from "../researchBtn";
import DatePicker from "react-datepicker";
import { DEFAULT_TIME_FMT, changeDateFmt } from "../../common/moment";
import { Code } from "@chakra-ui/react";
import { CustomShapeBarChart } from "../backtest/CustomShapeBarChart";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

import {
  addTickerToBackTest,
  changeIntervalForBacktest,
} from "../../redux/actions";
import BacktestChart from "../backtestChart";
import "react-datepicker/dist/react-datepicker.css";

function BackTest(props) {
  const { Index, Active } = props;
  const store = useSelector((state) => state.watchList);
  const watchList = store.watchList;
  const ticker = (store && store.ticker) || "NVDA";
  const [value, setValue] = useState(ticker);
  const [input, setInput] = useState(() => ticker);
  const [tableData, setTableData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [backtestData, setBackTestData] = useState(
    "Your Data Will Display Here"
  );
  const [isInvalid, setIsInvalid] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [interval, setInterval] = useState(store.interval);
  const dispatch = useDispatch();
  const handleChange = (event) => setValue(event.target.value);

  const handleDateSelect = (dt) => console.log(" Date Selected : ", dt);
  const handleDateChange = (dt) => console.log(" Date Changed  : ", dt);
  const onSubmitHandler = () => {
    if (value) {
      console.log("Sumit Handler has interval : ", interval);
      setInput(value);
      fetchData([value], startDate, endDate, interval);
    }
  };

  const onIntervalChange = (value) => {
    setTableData({});
    dispatch(changeIntervalForBacktest({ interval: value }));
    console.log("Interval Changed : ", value);
    setInterval(value);
  };

  const prepareBackTestResult = (data) => {
    const divs = backtestData.split("\\n").map((i, key) => (
      <>
        <div style={{ whiteSpace: "pre-line" }} key={key}>
          {i}
        </div>
        <br />
      </>
    ));
    return divs;
  };
  async function fetchData(symbols, startDate, endDate, range) {
    setBackTestData("");
    setTableData({});
    const resp = await getBackTestData(
      symbols,
      (startDate = ""),
      (endDate = ""),
      range
    );
    if (resp === undefined) {
      return 0;
    }
    const respBacktest = resp !== undefined ? resp["backtest_data"] : "";
    console.log(typeof respBacktest, respBacktest.split("\\n"));
    const parsedData = JSON.parse(resp["ticker_data"]);
    parsedData.length > 0 && setTableData(parsedData);
    setBackTestData(respBacktest);
  }

  React.useEffect(() => {
    if (Active === Index) {
      console.log("Interval To pull Data is : ", interval);
      ticker && fetchData([input], startDate, endDate, interval);
    }
  }, [Input, interval, startDate, endDate, Active]);

  return (
    <Box>
      <Box>
        <FormControl isRequired>
          <FormLabel>Back Test Strategy</FormLabel>
          <HStack pb="1rem">
            <Box>
              <Input
                placeholder="Ticker"
                value={value}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Button
                variant="brandPrimary"
                isLoading={isLoading}
                onClick={onSubmitHandler}
                // colorScheme='teal'
                // size='md'
              >
                Submit
              </Button>
            </Box>
            <Box w="20vw" h="2rem">
              <RadioButtons
                Value={interval}
                Params={periodButtonConf}
                OnChange={onIntervalChange}
              />
            </Box>
            {/* <Text>Start Date: </Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Text>End Date:</Text>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            /> */}
          </HStack>

          {/* {tableData && tableData.length > 0 ?
             <BacktestChart Interval={interval} Data={tableData}/> 
             : <Progress size='sm' isIndeterminate />
            } */}
          {tableData && tableData.length > 0 ? (
            <CustomShapeBarChart Interval={interval} Data={tableData} />
          ) : (
            <Progress size="sm" isIndeterminate />
          )}
        </FormControl>
        <div>{prepareBackTestResult(backtestData)}</div>
      </Box>
    </Box>
  );
}
export default BackTest;
