"use client";

import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { setCategory, setOrigin, setDestination } from "../../store/index";
import "react-toastify/dist/ReactToastify.css";
import { Autocomplete } from "@react-google-maps/api";
import { DROPDOWN_OBJ } from "../../Constant";
import { convertor } from "../../helper";
import { setCategoryId } from "../../store/index";
import AutocompleteCategory from "@mui/material/Autocomplete";
import StopSlider from "../StopSlider";
import SideBar from "../SideBar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SearchMaps = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const originRef = useRef();
  const destinationRef = useRef();
  let categoriesData = convertor(DROPDOWN_OBJ);
  const { destination, origin, category } = useSelector((state) => state.store);

  let [originVal, setOriginVal] = useState(origin);
  let [destinationVal, setDestinationVal] = useState(destination);
  let [inputValue, setInputValue] = useState(category);
  let [routerChange, setRouterChange] = React.useState(false);

  function handleDestinationVal(e) {
    setDestinationVal(e?.target?.value);
  }

  const debouncedOnChangeDestination = debounce(handleDestinationVal, 1000);

  function destinationChanged() {
    setRouterChange((pre) => !pre);
  }

  function handleOriginVal(e) {
    setOriginVal(e.target.value);
  }

  function handleCategoryChange(e, data) {
    dispatch(setCategory(data?.label));
    dispatch(setCategoryId(data?.id));
  }

  function inputChanged(e, value) {
    setInputValue(value);
  }

  // The Seach Btn Of Trip Functions
  /* global google */

  const debouncedOnChangeOrigin = debounce(handleOriginVal, 1000);

  function originChanged() {
    setRouterChange((pre) => !pre);
  }

  useEffect(() => {
    dispatch(setDestination(destinationVal));
  }, [destinationVal]);

  useEffect(() => {
    dispatch(setOrigin(originVal));
  }, [originVal]);

  React.useEffect(() => {
    if (
      originRef?.current?.value === "" ||
      destinationRef?.current?.value === ""
    ) {
      toast.error("Please provide both destination and origin");
    } else {
      const filteredOriginValue = originRef?.current?.value
        .replace(/, /g, "-")
        .replace(/ /g, "_");
      const filteredDestinationValue = destinationRef?.current?.value
        .replace(/, /g, "-")
        .replace(/ /g, "_");
      const filteredCategoryValue = category
        .replace(/, /g, "-")
        .replace(/ /g, "_");
      router.push(
        `/${filteredOriginValue}.${filteredDestinationValue}/${filteredCategoryValue}`
      );
    }
  }, [routerChange]);

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
                onAuxClick={debouncedOnChangeOrigin}
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
                onAuxClick={debouncedOnChangeDestination}
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
              onInputChange={inputChanged}
              inputValue={inputValue || ""}
              value={category || ""}
              options={categoriesData}
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
      </Grid>
    </div>
  );
};

export default SearchMaps;
