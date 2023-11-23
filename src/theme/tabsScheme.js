import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: "semibold",
    bg: "brand.200",
    m: ["0rem", "0.5rem", "1rem", "1.5rem"],
    py: "1rem",
    borderTopRadius: "lg",
    _selected: {
      color: "white",
      bg: "brand.200",
      borderColor: "inherit",
      borderBottom: "none",
      boxShadow: "lg",
      // mb: "-1px",
      _hover: { bg: "brand.200", boxShadow: "lg" },
    },
    // borderColor: "emerald.actions",
    // borderBottom: "none",
    _hover: { bg: "brand.100", boxShadow: "lg" },
  },
  tabpanel: {
    px: "6",
    // borderBottom: "2x solid",
    borderColor: "#85bb65",
  },
  heading: {
    bg: "brand.highlight.100",
  },
});

export const tabsScheme = defineMultiStyleConfig({ baseStyle });
