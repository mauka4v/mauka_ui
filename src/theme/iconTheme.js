import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const customIconButton = defineStyle({
  background: "orange.500",
  color: "blue.800",
  //   fontFamily: "serif",
  //   fontWeight: "normal",
  p: "2rem",
  h: "16",
  borderRadius: "md",

  // let's also provide dark mode alternatives
  _dark: {
    background: "orange.300",
    color: "orange.800",
  },
});

export const iconButtonTheme = defineStyleConfig({
  variants: { customIconButton },
});
