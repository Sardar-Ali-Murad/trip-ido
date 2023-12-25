"use client";
/* global google */

import { DROPDOWN_OBJ } from "../../../Constant";
import { convertor, replaceWithSpaceAndComma, start } from "../../../helper";
import { useRef } from "react";
import "../../globals.css";
import React from "react";
import { deleteCookie } from "cookies-next";
import { useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategory,
  setCategoryId,
  setDestination,
  setOrigin,
  setTab,
} from "@/store";
import TripsMap from "@/components/map/TripsMap";
import AttractionMap from "@/components/map/AttractionMap";
import StopSearchField from "@/components/stops/StopSearchFields";
import Stops from "@/components/stops/Stops";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import AttractionSection from "@/components/AttractionSection";
import { Grid, Box } from "@mui/material";
import { setCookie } from "cookies-next";
const libraries = ["places"];

export default function App({ params }) {
  let router = useRouter();
  let categoriesData = convertor(DROPDOWN_OBJ);
  let { category, origin, attractionData, tripsData, destination } =
    useSelector((state) => state.store);
  let libRef = useRef(libraries);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCf02s6yOXlZBU8ikFcFBB5bHXZWCoY_T0",
    // Below is murad google place API there is no billing enable in it just for testing purpose
    // googleMapsApiKey: "AIzaSyDWNrRa2YUZht-FN8M3ZzJ_i5jMbse3NlM",
    libraries: libRef.current,
    // libraries: ["places"],
  });

  let originVal;
  let destinationVal;
  let categoryVal;

  if (typeof window !== "undefined") {
    originVal = replaceWithSpaceAndComma(params?.origin.split(".")[0]);
    destinationVal = replaceWithSpaceAndComma(params?.origin.split(".")[1]);
    categoryVal = replaceWithSpaceAndComma(params?.cat);
  }
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state.store);
  const handleTabValueChange = (e, newValue) => {
    dispatch(setTab(newValue));
  };

  React.useEffect(() => {
    start(origin, destination, category, tab, router);
  }, [attractionData, tripsData, category]);

  React.useEffect(() => {
    if (originVal && originVal !== "" && originVal !== undefined) {
      deleteCookie("origin");
      dispatch(setOrigin(""));
      dispatch(setOrigin(originVal));
    }
    if (
      destinationVal &&
      destinationVal !== "" &&
      destinationVal !== undefined
    ) {
      dispatch(setTab(1));
      dispatch(setDestination(""));
      dispatch(setDestination(destinationVal));
    }

    if (
      originVal &&
      originVal !== "" &&
      originVal !== undefined &&
      (!destinationVal || destinationVal === "" || destinationVal === undefined)
    ) {
      dispatch(setTab(0));
      dispatch(setOrigin(originVal));
    }

    if (categoryVal && categoryVal !== "" && categoryVal !== undefined) {
      deleteCookie("category");
      dispatch(setCategory(""));
      dispatch(setCategory(categoryVal));

      let idObj = categoriesData.find((all) => all.label === categoryVal);

      if (idObj) {
        dispatch(setCategoryId(idObj.id));
      }
    }
  }, []);

  React.useEffect(() => {
    if (origin) {
      origin = replaceWithSpaceAndComma(origin);
      setCookie("origin", origin);
    }

    if (destination) {
      destination = replaceWithSpaceAndComma(destination);
      setCookie("destination", destination);
    }

    if (category) {
      category = replaceWithSpaceAndComma(category);
      setCookie("category", category);
    }
  }, [origin, destination, category]);

  if (isLoaded) {
    return (
      <div className="layout">
        <ToastContainer />
        <Grid container className="mainhead">
          <Grid item xs={12}>
            <NavBar handleChange={handleTabValueChange} value={tab} />
          </Grid>

          <Grid item xs={12} md={6} className="TabsHead">
            {tab == 0 && <AttractionSection params={params} />}
            {tab == 1 && (
              <Box>
                <StopSearchField />
                <Stops />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6} className="mapHead">
            {tab === 0 ? <AttractionMap /> : <TripsMap />}
          </Grid>
        </Grid>
      </div>
    );
  }
  return <div>Map loading...</div>;
}
