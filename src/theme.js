import { extendTheme, theme } from "@chakra-ui/react";
import { INFORMATION } from "./app/constants";

const MyTheme = extendTheme({
  colors: {
    primary: theme.colors[INFORMATION.color],
  },
});

export default MyTheme;
