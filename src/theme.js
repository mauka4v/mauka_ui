import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { colorSchemes } from "./theme/colorSchemes";
import { tabsScheme } from "./theme/tabsScheme";
import { buttonTheme } from "./theme/buttonTheme";
import { tableTheme } from "./theme/tableTheme";
import { iconButtonTheme } from "./theme/iconTheme";

const borderRadius = {
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
};

const Theme = extendTheme(
  {
    colors: colorSchemes,
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `Tahoma`,
      size: "0.8rem",
    },
    components: {
      Button: buttonTheme,
      Tabs: tabsScheme,
      Table: tableTheme,
    },
  }
  // IconButton: iconButtonTheme,
  // withDefaultColorScheme({
  //   colorScheme: colorSchemes,
  // }),
  // withDefaultVariant({
  //   variant: "filled",
  //   components: ["Input", "Select", "Radio"],
  // })
);

export default Theme;
