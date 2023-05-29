import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";

const CalenderSelect = () => {
  return (
    <div style={{ width: "100%" }}>
      <Calendar date={new Date()} />
    </div>
  );
};

export default CalenderSelect;
