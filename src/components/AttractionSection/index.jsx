// This Component Contains the Attraction Tab Data in this component he have Plcaes Component as well in ../places/Places.js

import { useState, useRef } from "react";
import "./index.css";
import { Autocomplete } from "@react-google-maps/api";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppConst from "../../AppConst";
import { convertor } from "../../helper";
import AttractionPlaces from "../attractionPlaces/Places";
import { DROPDOWN_OBJ } from "../../Constant";
import StopSlider from "../StopSlider";
import { Grid, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AutocompleteCategory from "@mui/material/Autocomplete";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";

import axios from "axios";
import {
  setOrigin,
  setCategory,
  setCategoryId,
  handleAttractionData,
} from "../../store/index";

const AttractionSection = () => {
  const origin = useSelector((state) => state.store.origin || undefined);
  let [originVal, setOriginVal] = useState(origin);
  const dispatch = useDispatch();
  const originRef = useRef(null);
  const category = useSelector((state) => state.store.category || undefined);
  const radius = useSelector((state) => state.store.radius || undefined);
  const limit = useSelector((state) => state.store.limit || undefined);
  const attractionData = useSelector(
    (state) => state.store.attractionData || undefined
  );
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const google = window.google;

  const [checked, setChecked] = useState(false);

  let [changePlace, setChangePlace] = useState(false);

  const categoryId = useSelector(
    (state) => state.store.categoryId || undefined
  );
  let [loading, setLoading] = useState(true);

  function handleSearchAttractions() {
    getArrtactions();
  }

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
      // data = data.sort((a, b) => a?.photos.length - b?.photos.length);
      displayAttractions(data);
      setLoading(false);
    }
  };

  function handleOrigin(e) {
    dispatch(setCategory(""));
    dispatch(setCategoryId(""));
    setOriginVal(e.target.value);
  }

  const debouncedOnChange = debounce(handleOrigin, 1000);

  function placeChanged() {
    dispatch(setCategory(""));
    dispatch(setCategoryId(""));
    setOriginVal(originRef?.current?.value);
    setChangePlace((pre) => !pre);
  }

  useEffect(() => {
    dispatch(setOrigin(originVal));
  }, [originVal]);

  // Handling the Category and the Category Id
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
    }
  };

  const geoSuccess = (position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    getReverseGeocodingData(lat, lng);
    toast.success("Please Wait To Get Results Near You!", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
  }, [category, limit, changePlace]);

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

  return (
    <>
      <div className="attraction">
        <Helmet>
          <title>{title}</title>
          <meta
            name={`${
              attractionData
                ? attractionData.join(" ")
                : "Welcome to our trip app! Discover a world of seamless travel experiences at your fingertips. Our app is designed to make your trip planning and exploration effortless and enjoyable. Browse through a wide range of destinations, find the best deals on flights and accommodations, and create personalized itineraries tailored to your preferences. With intuitive navigation and real-time updates, our trip app ensures you have access to the latest information, maps, and recommendations to enhance your journey. Whether you're a seasoned traveler or a first-time adventurer, our app is your trusted companion for unforgettable trips. Start exploring today and let our trip app be your gateway to unforgettable travel experiences"
            }`}
            content={`${
              attractionData
                ? attractionData.join(" ")
                : "Welcome to our trip app! Discover a world of seamless travel experiences at your fingertips. Our app is designed to make your trip planning and exploration effortless and enjoyable. Browse through a wide range of destinations, find the best deals on flights and accommodations, and create personalized itineraries tailored to your preferences. With intuitive navigation and real-time updates, our trip app ensures you have access to the latest information, maps, and recommendations to enhance your journey. Whether you're a seasoned traveler or a first-time adventurer, our app is your trusted companion for unforgettable trips. Start exploring today and let our trip app be your gateway to unforgettable travel experiences"
            }`}
          />
        </Helmet>
        <Grid container xs={12} justifyContent="space-between">
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
              <Autocomplete onPlaceChanged={placeChanged}>
                <TextField
                  className="attractionTextField"
                  error
                  defaultValue={originVal}
                  // value={originVal}
                  id="currrentLocation"
                  label="Provide Location"
                  variant="outlined"
                  inputRef={originRef}
                  placeholder="Your Location"
                  // onChange={handleOrigin}
                  onChange={debouncedOnChange}
                />
              </Autocomplete>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Category Start */}
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
            <Grid item xs={12} style={{ display: "flex", marginTop: "20px" }}>
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
              <p className="roboto">Use My Current Location</p>
            </Grid>
            {/* Category End */}
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
          <button
            className={`attractionSearchButton ${
              loading ? "disabledButton" : ""
            }`}
            onClick={handleSearchAttractions}
          >
            Search
          </button>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid
              item
              xs={12}
              sx={{ mt: "10px" }}
              className="attractionPictures"
            >
              <AttractionPlaces />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

export default AttractionSection;
