"use client";

import { Tabs, Tab, Box } from "@mui/material";
import "./index.css";
import logo from "../../../public/assets/logomain.svg";
import Image from "next/image";

const NavBar = ({ handleChange, value }) => {
  return (
    <>
      <Box className="tabsContainer">
        <Image
          src={logo}
          alt="logo"
          height={100}
          width={120}
          className="logo"
        />
        <Box className="tabButtons">
          <Tabs className="tabs" value={value} onChange={handleChange}>
            <Tab label="Attractions" style={{ color: "#e88b71" }} />
            <Tab label="Trips" style={{ color: "#e88b71" }} />
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
