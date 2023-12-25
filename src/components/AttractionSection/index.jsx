"use client";

import { useState, useRef } from "react";
import "./index.css";
import { Autocomplete } from "@react-google-maps/api";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppConst from "../../AppConst";
import { convertor, replaceWithSpaceAndComma } from "../../helper";
import AttractionPlaces from "../attractionPlaces/Places";
import { DROPDOWN_OBJ } from "../../Constant";
import StopSlider from "../StopSlider";
import { Grid, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AutocompleteCategory from "@mui/material/Autocomplete";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import SideBar from "../SideBar";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";
import axios from "axios";
import {
  setOrigin,
  setCategory,
  setCategoryId,
  handleAttractionData,
} from "../../store/index";

const AttractionSection = (props) => {
  const origin = useSelector((state) => state.store.origin || undefined);
  let [originVal, setOriginVal] = useState(origin);
  const dispatch = useDispatch();
  const originRef = useRef(null);
  const category = useSelector((state) => state.store.category || undefined);
  const radius = useSelector((state) => state.store.radius || undefined);
  const limit = useSelector((state) => state.store.limit || undefined);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const google = window.google;
  const params = props.params;

  const [checked, setChecked] = useState(false);

  let [changePlace, setChangePlace] = useState(false);

  const categoryId = useSelector(
    (state) => state.store.categoryId || undefined
  );
  let [loading, setLoading] = useState(true);

  const displayAttractions = (data) => {
    dispatch(handleAttractionData(data));
  };

  const getArrtactions = async () => {
    if (origin === undefined || origin === "") {
      toast.error(
        "Please Provide The Current Location To See Related Results",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
    if (category === undefined || category === "") {
      toast.error("Please Provide The Category To See Related Results", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (origin !== undefined && origin !== "") {
      setLoading(true);
      let url = `${AppConst.appBaseUrl}placesWithAddress/${origin}?limit=${limit}`;
      if (radius) {
        url += `&radius=${radius}`;
      }
      if (categoryId) {
        url += `&categories=${categoryId?.toString()}`;
      }

      url = url.replaceAll(" ", "");
      let { data } = await axios.get(url);
      data = data?.sort(function (a, b) {
        return parseFloat(a?.distance) - parseFloat(b?.distance);
      });
      displayAttractions(data);
      setLoading(false);
    }
  };

  function handleOrigin(e) {
    setOriginVal(e.target.value);
  }

  const debouncedOnChange = debounce(handleOrigin, 1000);

  function placeChanged() {
    setOriginVal(originRef?.current?.value);
    setChangePlace((pre) => !pre);
  }

  useEffect(() => {
    dispatch(setOrigin(originVal));
  }, [originVal]);

  let categoriesData = convertor(DROPDOWN_OBJ);

  function handleCategoryChange(e, data) {
    dispatch(setCategory(data?.label));
    dispatch(setCategoryId(data?.id));
  }

  const [inputValue, setInputValue] = useState(category);

  function inputChanged(e, value) {
    setInputValue(value);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      toast.success(
        "Please Allow Us To Use Your Current Location In Order To Get Results Near You!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      navigator.geolocation.getCurrentPosition(geoSuccess);
      setTimeout(() => {
        toast.dismiss();
      }, 1500);
    }
  };

  const geoSuccess = (position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    getReverseGeocodingData(lat, lng);
    toast.success("Please Wait To Get Results Near You!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      toast.dismiss();
    }, 1500);
  };

  const getReverseGeocodingData = (lat, lng) => {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = results[0]?.formatted_address;
        setOriginVal(address.split(" ").slice(1)?.join(" "));
        originRef.current.value = address.split(" ").slice(1).join(" ");
        dispatch(setOrigin(address.split(" ")?.slice(1).join(" ")));
        setChangePlace((pre) => !pre);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getArrtactions();
    }, 1500);
  }, [category, limit, changePlace, radius, origin]);

  function handleChange() {
    setChecked(true);
    getLocation();
    setTimeout(() => {
      setChecked(false);
    }, 5000);
  }

  let [title, setTitle] = useState(origin || "");
  useEffect(() => {
    let titleString = origin;
    if (category) {
      titleString = titleString + `/${category}`;
    }

    setTitle(titleString);
  }, [category]);

  let originValue;
  let destinationVal;
  let categoryVal;

  if (typeof window !== "undefined") {
    originVal = replaceWithSpaceAndComma(params?.origin.split(".")[0]);
    destinationVal = replaceWithSpaceAndComma(params?.origin.split(".")[1]);
    categoryVal = replaceWithSpaceAndComma(params?.cat);
  }

  useEffect(() => {
    // Check if it's the first load
    const isFirstLoad = sessionStorage.getItem("isFirstLoad") === null;
    if (isFirstLoad && !originValue && !destinationVal && !categoryVal) {
      // Run your function on the first load
      getLocation();
      // Set a flag in local storage to indicate that it's not the first load anymore
      sessionStorage.setItem("isFirstLoad", "false");
    }
  }, []);

  return (
    <>
      <div className="attraction">
        <Grid container xs={12} justifyContent="space-between">
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
              <Autocomplete onPlaceChanged={placeChanged}>
                <TextField
                  className="attractionTextField"
                  error
                  defaultValue={originVal}
                  id="currrentLocation"
                  label="Provide Location"
                  variant="outlined"
                  inputRef={originRef}
                  placeholder="Your Location"
                  onAuxClick={debouncedOnChange}
                />
              </Autocomplete>
            </Grid>
            <Grid item xs={12} md={6}>
              <AutocompleteCategory
                disablePortal
                id="category"
                className="attractionCategory"
                onChange={handleCategoryChange}
                value={category || ""}
                options={categoriesData}
                onInputChange={inputChanged}
                inputValue={inputValue || ""}
                renderInput={(params) => (
                  <TextField {...params} error label="Categories" />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} style={{ display: "flex" }}>
              <Checkbox
                {...label}
                defaultChecked
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                checked={checked}
                onChange={handleChange}
              />
              <p className="roboto">My Location</p>
            </Grid> */}
          </Grid>
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
            <Grid xs={12} md={12} className="slider">
              <StopSlider />
            </Grid>
          </Grid>
          <SideBar />
        </Grid>

        {loading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <Grid item xs={12} sx={{ mt: "10px" }} className="attractionPictures">
            <AttractionPlaces />
          </Grid>
        )}
      </div>
    </>
  );
};

export default AttractionSection;
