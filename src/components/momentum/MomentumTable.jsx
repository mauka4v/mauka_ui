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
  columnHelper.accessor("date", {
    field: "date",
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
  columnHelper.accessor("technical", {
    field: "technical",
    cell: (info) => info.getValue(),
    header: "Technical",
    meta: {
      isNumeric: false,
    },
    isFilter: true,
  }),
  columnHelper.accessor("message", {
    field: "message",
    cell: (info) => info.getValue(),
    header: "Price",
    meta: {
      isNumeric: false,
    },
    isFilter: false,
  }),
  columnHelper.accessor("momentum", {
    field: "momentum",
    cell: (info) => info.getValue(),
    header: "Momentum",
    meta: {
      isNumeric: false,
    },
    isFilter: true,
  }),
  columnHelper.accessor("interval", {
    field: "interval",
    cell: (info) => info.getValue(),
    header: "Interval",
    meta: {
      isNumeric: false,
    },
  }),
  columnHelper.accessor("profit_std", {
    field: "profit_std",
    cell: (info) => info.getValue(),
    header: "Profit Signal Till Date (%)",
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

function MomentumTable(props) {
  const { Data, PageNumber, PageLimit } = props;
  const [data, setData] = React.useState(() => Data);
  const [totalRows, setTotalRows] = React.useState(() => Data.length);

  React.useEffect(() => {
    setData(Data);
    setTotalRows(Data.length);
  }, [Data, PageNumber, PageLimit]);
  return (
    <DataTable
      columns={columns}
      data={data}
      RowsCount={totalRows}
      PageNumber={PageNumber}
      PageLimit={PageLimit}
    />
  );
}

export default MomentumTable;
