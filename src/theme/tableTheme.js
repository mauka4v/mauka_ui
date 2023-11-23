import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brandTable = defineStyle({
  th: {
    color: "brand.blue.800",
    bg: "brand.100",
  },
  tr: {
    boxshadow: "lg",
    // _odd: {
    //   bg: "emerald.bg",
    // },
  },
  td: {
    color: "brand.blue.800",
  },
  table: {
    colorScheme: "teal",
  },

  _hover: {
    bg: "brand.100",
    color: "brand.blue.800",
    boxShadow: "sm",
  },
  //   // let's also provide dark mode alternatives
  // _dark: {
  //   bg: "brand.100",
  //   color: "brand.blue.800",
  // },
});

export const tableTheme = defineStyleConfig({
  variants: { brandTable },
});
