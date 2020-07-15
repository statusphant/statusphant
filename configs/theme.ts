import { theme } from "@chakra-ui/core";

export default {
  ...theme,
  containerWidth: "1200px",
  breakpoints: ["40em", "52em", "64em"],
  colors: {
    ...theme.colors,
    green: {
      50: "#f1ffdd",
      100: "#ddffaf",
      200: "#c8ff7f",
      300: "#b3ff4d",
      400: "#9eff1e",
      500: "#84e607",
      600: "#66b300",
      700: "#488000",
      800: "#2a4d00",
      900: "#0c1b00",
    },
  },
};
