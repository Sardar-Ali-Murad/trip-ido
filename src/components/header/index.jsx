// This is the Header Very Fisrt Part of the App

import * as React from "react";
import "./styles.css";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <Box className="topHeader">
        <Box className="contentHead">
          <Typography variant="h1">Make your trip easy and relaxed!</Typography>
          <Typography variant="subtitle2">
            Select your origin and destination and we will find the best stops
            for your way
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Header;
