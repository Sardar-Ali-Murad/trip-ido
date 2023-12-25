"use client";

import React from "react";
import "./stop.css";
import SingleStop from "./SingleStop";
import { Box } from "@mui/material";

const Stop = ({ data }) => {
  if (data?.length <= 0 || data === undefined || data === null) {
    return <p>No Data Between These Routes</p>;
  }

  let [expanded, setExpanded] = React.useState();

  return (
    <Box>
      <div className="accParentTop">
        {data.length > 0 &&
          data?.map((item, index) => (
            <SingleStop
              item={item}
              index={index}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
      </div>
    </Box>
  );
};

export default Stop;
