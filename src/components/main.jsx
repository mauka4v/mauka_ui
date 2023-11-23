import React, { useState } from "react";
import { isTextAllowed, UNDEFINED, periodButtonConf } from "../common";
import { getTickerData } from "../api/maukaApi";
import DataTableComp from "./table";
import RadioButtons from "./radio";

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

function Main() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(() => false);
  const [isInvalid, setIsInvalid] = useState(() => false);
  const [tableData, setTableData] = useState({});

  const handleInputChange = (e) => {
    tableData && setTableData({});
    const ticker = e.target.value;
    if (ticker !== undefined) {
      !isTextAllowed(input) ? setInput(ticker) : setIsInvalid(true);
    }
  };

  const onSubmitHandler = async () => {
    let period = "1wk";
    if (input !== UNDEFINED) {
      setIsLoading(true);
      let tickerData = {};
      const tickers = input.replace(" ", "").split(",");
      tickerData = await getTickerData(tickers, period);
      Object.keys(tickerData).length > 0 && setTableData(tickerData);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <FormControl isRequired>
        <FormLabel>Ticker</FormLabel>
        {/* <SimpleGrid gap={12} p={12} columns={3}>*/}
        <HStack spacing="24px">
          <Box w="50vw" h="40px">
            <Input
              isInvalid={isInvalid}
              placeholder="Ticker Symbol"
              value={input}
              onChange={handleInputChange}
            />
          </Box>
          <Box w="20vw" h="2rem">
            <RadioButtons Params={periodButtonConf} />
          </Box>
          <Box w="20vw" h="40px">
            <Button
              isLoading={isLoading}
              onClick={onSubmitHandler}
              colorScheme="teal"
              size="md"
            >
              {" "}
              Submit
            </Button>
          </Box>
        </HStack>

        {/* <SimpleGrid columns={[6, null, 4]} spacing='40px'>
            
                
        <RadioButtons Params={radioButtonConf}/>

        <Button 
            isLoading={isLoading} 
            onClick={onSubmitHandler}
            colorScheme='teal' 
            size='md'> Submit
        </Button>
        </SimpleGrid> */}
      </FormControl>

      {Object.keys(tableData).length > 0 && (
        <DataTableComp TickersData={tableData} />
      )}
      {/* {Object.keys(tableData).length > 0 && prepareSignalTable(tickers)} */}
    </Box>
  );
}

export default Main;
