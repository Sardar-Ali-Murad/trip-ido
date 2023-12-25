"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppConst from "../../AppConst";
import Stop from "./Stop";
import { handleTripsData } from "../../store/index";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { showLoading, removeLoading } from "../../store/index";

const Stops = () => {
  const dispatch = useDispatch();
  const { origin, destination, tripsData, loading, category } = useSelector(
    (state) => state.store
  );

  const getStops = async () => {
    // debugger
    dispatch(showLoading());
    let url = AppConst.appBaseUrl + "stops?route=" + origin + ":" + destination;
    url = url.replaceAll(" ", "");
    let { data } = await axios.get(url);
    dispatch(handleTripsData(data));
    dispatch(removeLoading());
  };

  React.useEffect(() => {
    getStops();
  }, [origin, destination]);

  let [title, setTitle] = React.useState(origin || "");
  React.useEffect(() => {
    let titleString = origin;
    if (destination) {
      titleString = titleString + `/${destination}`;
    }
    if (category) {
      titleString = titleString + `/${category}`;
    }

    setTitle(titleString);
  }, [category]);

  return (
    <div>{loading ? <CircularProgress /> : <Stop data={tripsData}></Stop>}</div>
  );
};

export default Stops;
