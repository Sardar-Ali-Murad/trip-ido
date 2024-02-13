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
import { toast } from "react-toastify";
import SideBar from "../SideBar";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  setOrigin,
  setCategory,
  setCategoryId,
  handleAttractionData,
} from "../../store/index";

const AttractionSection = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { destination, origin, category, radius, limit, categoryId } =
    useSelector((state) => state.store);

  let [originVal, setOriginVal] = useState(origin);
  let [loading, setLoading] = useState(true);
  let [routerCall, setRouterCall] = useState(false);
  let [changePlace, setChangePlace] = useState(false);
  let [inputValue, setInputValue] = useState(category);

  const originRef = useRef(null);
  const google = window.google;
  const params = props.params;

  const displayAttractions = (data) => {
    dispatch(handleAttractionData(data));
  };

  const getAttractions = async () => {
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
    setOrigin(originRef?.current?.value);
    setRouterCall((pre) => !pre);
  }

  let categoriesData = convertor(DROPDOWN_OBJ);

  function handleCategoryChange(e, data) {
    dispatch(setCategory(data?.label));
    dispatch(setCategoryId(data?.id));
  }

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
      getAttractions();
    }, 1500);
  }, [category, limit, changePlace, radius, origin]);

  useEffect(() => {
    let titleString = origin;
    if (category) {
      titleString = titleString + `/${category}`;
    }
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
    const filteredOriginValue = originRef?.current?.value
      .replace(/, /g, "-")
      .replace(/ /g, "_");
    const filteredCategoryValue = category
      .replace(/, /g, "-")
      .replace(/ /g, "_");
    router.push(`/${filteredOriginValue}/${filteredCategoryValue}`);
  }, [routerCall, destination]);

  useEffect(() => {
    dispatch(setOrigin(originVal));
  }, [originVal]);

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
