import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brandPrimary = defineStyle({
  bg: "brand.blue.800",
  color: "brand.100",
  _hover: { bg: "brand.100", color: "brand.blue.800", boxShadow: "lg" },
  // let's also provide dark mode alternatives
  _dark: {
    bg: "brand.100",
    color: "brand.blue.800",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
});
