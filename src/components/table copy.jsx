import React, {useState} from 'react';
import Signal from './signal';
import {PRICE_ACTION, RSI, MACD} from "../common"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


function DataTableComp(props) {
    const[tableRows, setTableRows] =useState("")
    const[tableHeader, setTableHeader] =useState("")
    const[dataCols, setDataColumns] = useState([])
    const[dataRows, setDataRows] = useState([])
    const dataObj = props.Data
    const ticker = props.Ticker
    const tickerData = JSON.parse(dataObj)
    const rows = tickerData.data || []
    const columns = tickerData.index || []

    const prepareTableRows = (listOfData, isHeader=false) => {
        const trStartTag = "<Tr>"
        const trEndTag = "</Tr>"
        if (isHeader){
           let tableHeaderHTML = "" 
           listOfData.map((colHeader) =>{
            tableHeaderHTML = `${tableHeaderHTML}<Th>${colHeader}</Th>`
           })
           return `${trStartTag}${tableHeaderHTML}${trEndTag}`
        }
        else{

            let tableRowHtml = ""
            listOfData.map(row =>{
                 row.map(cell=>{
                    tableRowHtml = `${tableRowHtml}<Td>${cell}</Td>`
                 })
                 tableRowHtml = `${trStartTag}${tableRowHtml}${trEndTag}`
            })
        }
    }
    React.useEffect(()=>{
      console.log(dataObj)
        if(rows.length > 0 ){
            setDataColumns(columns)
            setDataRows(rows)
            // const headerRow = prepareTableRows(columns, true)
            // setTableHeader(headerRow)
            // const tableRowHtml = prepareTableRows(rows)
            // setTableRows(tableRowHtml)
        }
    }, [dataObj])

    return(
        <>
           <TableContainer>
                <Table colorScheme='teal'>
            <TableCaption>
              <i>*Signals are subjected to upcoming News, Mergers and Earnings!!!</i>
            </TableCaption>
            <Thead>
      <Tr>
        <Th>Ticker</Th>
        <Th >Price Action</Th>
        <Th> MACD</Th>
        <Th >RSI</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>{ticker}</Td>
        <Td><Signal Columns={dataCols} DataRows={dataRows} Type={PRICE_ACTION}/></Td>
        <Td><Signal Columns={dataCols} DataRows={dataRows} Type={MACD}/></Td>
        <Td><Signal Columns={dataCols} DataRows={dataRows} Type={RSI}/></Td>
      </Tr>
      {/* <Tr>
        <Td>{ticker}</Td>
        <Td><Signal SignalValue="0" /></Td>
        <Td><Signal SignalValue="1"/></Td>
        <Td><Signal SignalValue="2"/></Td>
      </Tr> */}
    </Tbody>
            </Table>
    </TableContainer>
        </>

    )   
}
export default DataTableComp