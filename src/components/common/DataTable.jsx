import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Input,
  Text,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  useGlobalFilter,
} from "@tanstack/react-table";
// import { useDispatch } from "react-redux";
// import ColumnFilter from "./ColumnFilter";
import "./DataTable.css";

export function DataTable({ data, columns, RowsCount }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnsDef, setColumnsDef] = React.useState(() => columns);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  // const applyFilter = (e) => {
  //   console.log("Filter APplied : ", e.target.value);
  //   // const dispatch = useDispatch();
  //   // dispatch(setSignalFilters(e.target.value));
  // };

  return (
    <Table variant="brandTable">
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span>
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                    <chakra.span size="sm" p="2">
                      ({RowsCount})
                    </chakra.span>
                    {/* {header.column.columnDef.isFilter && (
                      <ColumnFilter
                        ColumnName={header.column.columnDef.field}
                        FilterFn={applyFilter}
                      />
                    )} */}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
