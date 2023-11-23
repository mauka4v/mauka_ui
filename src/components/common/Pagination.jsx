// import React, { useState, useEffect } from "react";
// import { Box, Flex, Spacer } from "@chakra-ui/react";
// import {
//   Previous,
//   Paginator,
//   PageGroup,
//   Page,
//   Next,
//   generatePages,
// } from "chakra-paginator";
// import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

// function Pagination() {
//   const limit = 100;
//   const [pagesQuantity, setPagesQuantity] = useState(0);
//   const [curPage, setCurPage] = useState(0);

//   const normalStyles = {
//     bg: "white",
//   };

//   const activeStyles = {
//     bg: "blue.300",
//   };

//   const handlePageChange = (page) => {
//     setCurPage(page);
//   };

//   useEffect(() => {
//     const pagesTotal = Math.ceil(items.length / limit);

//     setPagesQuantity(pagesTotal);
//   }, [items.length]);

//   return (
//     <Box>
//       <Flex p={2}>
//         <Spacer />
//         <Paginator
//           onPageChange={handlePageChange}
//           pagesQuantity={pagesQuantity - 1}
//         >
//           <Previous bg="white">
//             <CgChevronLeft />
//           </Previous>
//           <PageGroup>
//             {generatePages(pagesQuantity)?.map((page) => (
//               <Page
//                 key={`paginator_page_${page}`}
//                 page={page}
//                 normalStyles={normalStyles}
//                 activeStyles={activeStyles}
//               />
//             ))}
//           </PageGroup>
//           <Next bg="white">
//             <CgChevronRight />
//           </Next>
//         </Paginator>
//       </Flex>
//     </Box>
//   );
// }

// export default Pagination;
