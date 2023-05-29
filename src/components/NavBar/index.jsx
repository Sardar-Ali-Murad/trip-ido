// This is the Navbar where there are Attraction and Trips Link

import { Tabs, Tab, Box } from "@mui/material";
import "./index.css";

const NavBar = ({ handleChange, value }) => {
  return (
    <>
      <Box className="tabsContainer">
        <Box className="tabButtons">
          <Tabs className="tabs" value={value} onChange={handleChange}>
            <Tab label="Attractions" />
            <Tab label="Trips" />
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
