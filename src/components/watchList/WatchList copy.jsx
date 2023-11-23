import React, {useState} from "react";
import {getTickerData, getSignalData} from "../../api/maukaApi"
import {isTextAllowed, UNDEFINED, periodButtonConf} from "../../common"
import DataTableComp from "../table";
import {   Progress  } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import RadioButtons from "../radio";
import { changeInvPeriod } from '../../redux/reducers'
import RemoveTickerBtn from "../removeTicker";
import ResearchButton from "../researchBtn";
import SignalTable from "../SignalTable";

import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    HStack,
    SimpleGrid,
  } from '@chakra-ui/react'

import {addTickerToWatchList} from "../../redux/actions"

function WatchList(props) {
    const sampleData = [{"create_date": "2023-10-02T13:30:00Z", "ticker": "vis", "category": "RSI", "message": "Test Message", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-12T01:00:00.200000Z", "ticker": "vis", "category": "RSI", "message": "Test Message", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T16:10:24.936827Z", "ticker": "NVDA", "category": "RSI", "message": "TEST RSI MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T16:13:34.795442Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:15:41.081114Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:16:05.286742Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:17:03.115969Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:20:33.807084Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:00.472935Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:05.080184Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:07.617016Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:09.583076Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:12.070503Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:14.421914Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:49.519668Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:51.883347Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:21:54.267124Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:22:26.214258Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:22:39.729143Z", "ticker": "TSLA", "category": "PRICE", "message": "TEST Price MEssage", "message_type": "Bullish", "time_range": "1m"}, {"create_date": "2023-10-15T17:26:51.589415Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}, {"create_date": "2023-10-15T17:26:59.260171Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}, {"create_date": "2023-10-15T17:27:07.815673Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}, {"create_date": "2023-10-15T17:27:56.504392Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}, {"create_date": "2023-10-15T17:28:41.132825Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}, {"create_date": "2023-10-15T17:30:40.015508Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}, {"create_date": "2023-10-15T17:30:45.868696Z", "ticker": "TSLA", "category": "price", "message": "Buy", "message_type": "Bullish", "time_range": "1d"}]
    const store = useSelector(state=> state.watchList)
    const watchList = store.watchList || []
    const [input, setInput] = useState('')
    const [tableData, setTableData] = useState({})
    const [isInvalid, setIsInvalid] = useState(()=> false)
    const [isLoading, setIsLoading] = useState(()=>false)
    const [signalData, setSignalData] = useState([])
    const [period, setPeriod] = useState(store.period)
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const ticker = e.target.value
        if (ticker !== UNDEFINED && ticker.length > 0){
            !isTextAllowed(input) ?  setInput(ticker) : setIsInvalid(true)
        }
    }

    const onSubmitHandler = async () => {
        if (input){
            dispatch(addTickerToWatchList({ticker: input}))
            setInput("")
        }
    }

    const onPeriodChange = (value) => {
        setTableData({})
        dispatch(changeInvPeriod({period: value}))
        setPeriod(value)
    }
  
    React.useEffect(()=>{

        async function fetchData(symbols, range){
            const signalDataResp = await getSignalData()
            signalDataResp && setSignalData(signalDataResp)
            console.log("Refreshing Data with ", {symbols, range})
            // const tickerData = await getTickerData(symbols, range)
            // Object.keys(tickerData).length > 0 &&  setTableData(tickerData)
        }
        watchList.length > 0 && fetchData(watchList, period) 
    }, [watchList, period]
    )

    return(
      <Box>
        <Box>
            <FormControl isRequired>
            <FormLabel>Watch List</FormLabel>
            <HStack spacing='24px'>
            <Box w='50vw' h='40px'>
                <Input 
                        isInvalid = {isInvalid}
                        placeholder='Ticker' 
                        value={input} 
                        onChange={handleInputChange}
                    />

            </Box>
            <Box w='20vw' h='2rem'>
                <RadioButtons Value={period} Params={periodButtonConf} OnChange={onPeriodChange}/>
            </Box>
            <Box w='20vw' h='40px'>
                <Button 
                isLoading={isLoading} 
                onClick={onSubmitHandler}
                colorScheme='teal' 
                size='md'> Submit
            </Button>
            </Box>
            </HStack>
        </FormControl>

    </Box>

    {signalData &&<SignalTable Data={signalData}/>}
        {
            Object.keys(tableData).length > 0 ? <DataTableComp 
                TickersData={tableData}/> : 
                <Progress size='xs' isIndeterminate />
        }
        </Box>

    )
}
  export default WatchList