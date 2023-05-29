import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { mainTheme } from "./theme";

const Config = (props) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default Config;
