// If You Click the "Trip Link" You see the Origin And Destination Category and the Radius and the Search Button This compoennet contains all that!

import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";

import {
  setCategory,
  setOrigin,
  setDestination,
  setDirectionsResponse,
  handleTripsData,
} from "../../store/index";
import AppConst from "../../AppConst";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { DROPDOWN_OBJ } from "../../Constant";
import { convertor } from "../../helper";

import { showLoading, removeLoading } from "../../store/index";

import { setCategoryId } from "../../store/index";
import AutocompleteCategory from "@mui/material/Autocomplete";
import StopSlider from "../StopSlider";
import SideBar from "../SideBar";

const SearchMaps = () => {
  const destination = useSelector(
    (state) => state.store.destination || undefined
  );

  const origin = useSelector((state) => state.store.origin || undefined);

  let [originVal, setOriginVal] = useState(origin);
  let [destinationVal, setDestinationVal] = useState(destination);
  const dispatch = useDispatch();

  // debugger
  const originRef = useRef();
  const destinationRef = useRef();

  // The Bebouncing For THE ORIGIN

  // The Destination

  function handleDestinationVal(e) {
    setDestinationVal(e?.target?.value);
  }

  const debouncedOnChangeDestination = debounce(handleDestinationVal, 1000);

  function destinationChanged(e) {
    setDestinationVal(destinationRef?.current?.value);
  }

  useEffect(() => {
    dispatch(setDestination(destinationVal));
  }, [destinationVal]);

  // The Origin
  function handleOriginVal(e) {
    setOriginVal(e.target.value);
  }

  const debouncedOnChangeOrigin = debounce(handleOriginVal, 1000);

  function originChanged() {
    setOriginVal(originRef?.current?.value);
  }

  useEffect(() => {
    dispatch(setOrigin(originVal));
  }, [originVal]);

  const category = useSelector((state) => state.store.category || undefined);
  let categoriesData = convertor(DROPDOWN_OBJ);
  function handleCategoryChange(e, data) {
    dispatch(setCategory(data?.label));
    dispatch(setCategoryId(data?.id));
  }

  const [inputValue, setInputValue] = useState(category);

  function inputChanged(e, value) {
    setInputValue(value);
  }

  // The Seach Btn Of Trip Functions
  /* global google */

  const calculateRoute = async () => {
    let loc1 = null;
    let loc2 = null;
    loc1 = origin;
    loc2 = destination;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: loc1,
      destination: loc2,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    dispatch(setDirectionsResponse(results));
  };

  const getStops = async () => {
    // debugger
    dispatch(showLoading());
    let url = AppConst.appBaseUrl + "stops?route=" + origin + ":" + destination;
    url = url.replaceAll(" ", "");
    let { data } = await axios.get(url);
    dispatch(handleTripsData(data));
    dispatch(removeLoading());
  };

  function handleTripMapBtn() {
    setTimeout(() => {
      if (
        origin === undefined ||
        origin === "" ||
        destination === undefined ||
        destination === ""
      ) {
        toast.error(
          "Please Provide Both Origin And Destination To See Related Results",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
      if (
        origin !== undefined &&
        origin !== "" &&
        destination !== undefined &&
        destination !== ""
      ) {
        calculateRoute();
        getStops();
      }
    }, 1200);
  }

  return (
    <div className="searchMap">
      <Grid xs={12} container justifyContent="space-between">
        <Grid
          container
          item
          columnSpacing={{ xs: 0, md: 1, lg: 2, xl: 3 }}
          rowSpacing={{ xs: 2, md: 0 }}
          xs={12}
        >
          <Grid item xs={12} md={6}>
            <Autocomplete onPlaceChanged={originChanged}>
              <TextField
                error
                id="origin"
                label="Origin"
                variant="outlined"
                defaultValue={originVal}
                inputRef={originRef}
                placeholder="From"
                className="searchTextField"
                // onChange={handleOriginVal}
                onChange={debouncedOnChangeOrigin}
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete onPlaceChanged={destinationChanged}>
              <TextField
                error
                id="destination"
                label="Destination"
                variant="outlined"
                defaultValue={destinationVal}
                inputRef={destinationRef}
                placeholder="To"
                className="searchTextField"
                // onChange={handleDestinationVal}
                onChange={debouncedOnChangeDestination}
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={12} md={12} style={{ marginTop: "15px" }}>
            {/* Category Start */}
            <AutocompleteCategory
              disablePortal
              id="category"
              sx={{ minWidth: "14rem", maxWidth: "97vw" }}
              onChange={handleCategoryChange}
              // inputRef={categoryRef}
              onInputChange={inputChanged}
              inputValue={inputValue || ""}
              value={category || ""}
              options={categoriesData}
              // isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => (
                <TextField {...params} error label="Categories" />
              )}
            />
          </Grid>
          {/* Category End */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid xs={12} md={12} lg={12} className="slider">
              <StopSlider />
            </Grid>
          </Grid>
        </Grid>
        <SideBar />
        <button className={`attractionSearchButton`} onClick={handleTripMapBtn}>
          Search
        </button>
      </Grid>
    </div>
  );
};

export default SearchMaps;
