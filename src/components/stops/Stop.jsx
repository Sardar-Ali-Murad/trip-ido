import React from "react";
import "./stop.css";
import SingleStop from "./SingleStop";
// Components
// Mui imports
import { Box } from "@mui/material";

// Images and Icons

const Stop = ({ data }) => {
  if (data?.length <= 0 || data === undefined || data === null) {
    return <p>No Data Between These Routes</p>;
  }

  return (
    <Box>
      <div className="accParentTop">
        {data.length > 0 &&
          data?.map((item, index) => <SingleStop item={item} index={index} />)}
      </div>
    </Box>
  );
};

export default Stop;
