import * as React from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Badge,
  filter,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import {
  relativeTime,
  convertTimeToLocalTz,
  DEFAULT_TIME_FMT,
} from "../../common/moment";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("create_date", {
    field: "create_date",
    cell: (info) => signalCreateDateFmt(info.getValue()),
    header: "Timestamp",
  }),
  columnHelper.accessor("ticker", {
    field: "ticker",
    cell: (info) => info.getValue(),
    header: "Ticker",
    isFilter: true,
    filter: ["XRX"],
  }),
  columnHelper.accessor("category", {
    field: "category",
    cell: (info) => info.getValue(),
    header: "Category",
    meta: {
      isNumeric: false,
    },
    isFilter: true,
  }),
  columnHelper.accessor("message", {
    field: "message",
    cell: (info) => info.getValue(),
    header: "Message",
    meta: {
      isNumeric: false,
    },
    isFilter: true,
  }),
  columnHelper.accessor("message_type", {
    field: "message_type",
    cell: (info) => info.getValue(),
    header: "Message Type",
    meta: {
      isNumeric: false,
    },
    isFilter: true,
  }),
  columnHelper.accessor("time_range", {
    field: "time_range",
    cell: (info) => info.getValue(),
    header: "Interval",
    meta: {
      isNumeric: false,
    },
  }),
];

const signalCreateDateFmt = (date) => (
  <Flex>
    <Box ml="3">
      <Text>{convertTimeToLocalTz(date, DEFAULT_TIME_FMT)}</Text>
      <Text fontSize="0.7em">
        <i>{relativeTime(date)}</i>
      </Text>
    </Box>
  </Flex>
);

function SignalTable(props) {
  const { Data } = props;
  const [data, setData] = React.useState(() => Data);
  const [totalRows, setTotalRows] = React.useState(() => Data.length);

  React.useEffect(() => {
    setData(Data);
    setTotalRows(Data.length);
  }, [Data]);
  return <DataTable columns={columns} data={data} RowsCount={totalRows} />;
}

export default SignalTable;
