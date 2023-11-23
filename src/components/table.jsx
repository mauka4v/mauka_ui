import React from "react";
import Signal from "./signal/Signal";
import { COLS_TO_PUBLISH } from "../common";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  HStack,
} from "@chakra-ui/react";
import ResearchButton from "./researchBtn";
import RemoveTickerBtn from "./removeTicker";

function DataTableComp(props) {
  const { Columns, Actions, TickersData } = props;
  const prepareTableHeaders = () => {
    return Columns.map((col, index) => <Th key={index}>{col}</Th>);
  };

  const prepareRowCells = (rowData) =>
    Columns.map((colName, index) => (
      <Td key={index}>
        <Signal Column={colName} RowJSON={rowData} Type={colName} />
      </Td>
    ));

  const prepareTableRows = (data) => {
    const rowsHtml = data.map((row, index) => {
      return (
        <Tr key={index}>
          {prepareRowCells(row)}
          <Td>
            <RemoveTickerBtn />
            <ResearchButton />
          </Td>
        </Tr>
      );
    });
    return rowsHtml;
  };

  return (
    <TableContainer>
      <Table>
        <TableCaption>
          <i>
            *Trends are subject to change on upcoming News, Mergers and
            Earnings!!!
          </i>
        </TableCaption>
        <Thead>
          <Tr>
            {prepareTableHeaders()}
            {Actions && <Th></Th>}
          </Tr>
        </Thead>
        <Tbody>{prepareTableRows(TickersData)}</Tbody>
      </Table>
    </TableContainer>
  );
}
export default DataTableComp;
