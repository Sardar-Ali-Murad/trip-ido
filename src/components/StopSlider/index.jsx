"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRadius } from "../../store/index";
import "./index.css";

const StopSlider = () => {
  let dispatch = useDispatch();

  const radius = useSelector((state) => state.store.radius || undefined);

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 75,
      label: "75",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  return (
    <Box
      className="sliderBox"
      style={{ display: "flex", alignItems: "center", gap: "15px" }}
    >
      <Slider
        defaultValue={50}
        aria-label="auto"
        onChange={(e) => dispatch(setRadius(e.target.value))}
        value={radius}
        min={0}
        max={100}
        valueLabelDisplay="auto"
        marks={marks}
        classes="appSlider"
        style={{ width: "90%" }}
      />
      <p>km</p>
    </Box>
  );
};

export default StopSlider;
