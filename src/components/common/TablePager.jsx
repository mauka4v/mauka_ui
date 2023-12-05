import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Select,
  Tooltip,
  IconButton,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const TablePaging = (props) => {
  const {} = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const incrementPage = () => setPageNumber(pageNumber + 1);
  const decrementPage = () => setPageNumber(pageNumber - 1);

  return (
    <Flex>
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => setPageNumber(1)}
            isDisabled={pageNumber === 1}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={() => decrementPage()}
            isDisabled={pageNumber <= 1}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
        <Box p={1} mt={1}>
          Page {pageNumber} / {pageCount}
        </Box>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => incrementPage()}
            isDisabled={pageNumber === pageCount}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => setPageNumber(pageCount)}
            isDisabled={pageNumber === pageCount}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

// const TablePaging = (props) => {
//   const {
//     PageCount,
//     PageIndex,
//     ChangePageIndex,
//     Increment,
//     Decrement,
//     ChangePageLimit,
//   } = props;
//   const [pageSize, setPageSize] = useState(10);
//   const [canNextPage, setCanNextPage] = useState(true);
//   const [canPreviousPage, setCanPreviousPage] = useState(false);
//   const [pageIndex, setPageIndex] = useState(PageIndex);
//   const [pageOptions, setPageOptions] = useState(20);
//   const [previousPage, setPreviousPage] = useState(0);
//   const [nextPage, setNextPage] = useState(1);
//   const [pageCount, setPageCount] = useState(PageCount);
//   const gotoPage = (n) => {
//     console.log("changing go to page : ", n);
//     ChangePageIndex(n);
//     setPageIndex(n);
//   };
//   console.log(
//     PageCount,
//     PageIndex,
//     ChangePageIndex,
//     Increment,
//     Decrement,
//     ChangePageLimit
//   );

//   return (
//     <Flex justifyContent="space-between" m={4} alignItems="center">
//       <Flex>
//         <Tooltip label="First Page">
//           <IconButton
//             onClick={() => gotoPage(0)}
//             isDisabled={!canPreviousPage}
//             icon={<ArrowLeftIcon h={3} w={3} />}
//             mr={4}
//           />
//         </Tooltip>
//         <Tooltip label="Previous Page">
//           <IconButton
//             onClick={Decrement}
//             isDisabled={pageIndex <= 0}
//             icon={<ChevronLeftIcon h={6} w={6} />}
//           />
//         </Tooltip>
//       </Flex>

//       <Flex alignItems="center">
//         <Text flexShrink="0" mr={8}>
//           Page{" "}
//           <Text fontWeight="bold" as="span">
//             {pageIndex + 1}
//           </Text>{" "}
//           of{" "}
//           <Text fontWeight="bold" as="span">
//             {pageCount}
//           </Text>
//         </Text>
//         <Text flexShrink="0">Go to page:</Text>{" "}
//         <NumberInput
//           ml={2}
//           mr={8}
//           w={28}
//           min={1}
//           max={pageCount}
//           onChange={(value) => {
//             const page = value > 0 ? value - 1 : 0;
//             gotoPage(page);
//           }}
//           defaultValue={pageIndex + 1}
//         >
//           <NumberInputField />
//           <NumberInputStepper>
//             <NumberIncrementStepper />
//             <NumberDecrementStepper />
//           </NumberInputStepper>
//         </NumberInput>
//         <Select
//           w={32}
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </Select>
//       </Flex>

//       <Flex>
//         <Tooltip label="Next Page">
//           <IconButton
//             onClick={Increment}
//             isDisabled={pageIndex > 0}
//             icon={<ChevronRightIcon h={6} w={6} />}
//           />
//         </Tooltip>
//         <Tooltip label="Last Page">
//           <IconButton
//             onClick={() => gotoPage(pageCount - 1)}
//             isDisabled={!canNextPage}
//             icon={<ArrowRightIcon h={3} w={3} />}
//             ml={4}
//           />
//         </Tooltip>
//       </Flex>
//     </Flex>
//   );
// };

export default TablePaging;
