import { DROPDOWN_OBJ } from "../Constant";
import { convertor } from "../helper";

import { useRef } from "react";
import "../App.css";
import React from "react";

import { useJsApiLoader } from "@react-google-maps/api";
// import {Loa}  from "@react-google-maps/api"
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setCategoryId,
  setDestination,
  setOrigin,
  setTab,
} from "../store";
import TripsMap from "../components/map/TripsMap";
import AttractionMap from "../components/map/AttractionMap";
// components
import StopSearchField from "../components/stops/StopSearchFields";
import Stops from "../components/stops/Stops";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Header from "../components/header/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import AttractionSection from "../components/AttractionSection";
// mui
import { Grid, Box } from "@mui/material";
const libraries = ["places"];

export default function App() {
  let navigate = useNavigate();
  let { category, origin, attractionData, tripsData, destination } =
    useSelector((state) => state.store);
  // let {loading}=useSelector((state)=>state.store)
  let libRef = useRef(libraries);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCf02s6yOXlZBU8ikFcFBB5bHXZWCoY_T0",
    // Below is murad google place API there is no billing enable in it just for testing purpose
    // googleMapsApiKey: "AIzaSyDWNrRa2YUZht-FN8M3ZzJ_i5jMbse3NlM",
    libraries: libRef.current,
    // libraries: ["places"],
  });

  let url = decodeURI(window.location.href);
  let originVal = url?.split("/")[3]?.split(":")[0];
  let destinationVal = url?.split("/")[3]?.split(":")[1];
  let categoryVal = url?.split("/")[4];

  // let originVal=window.location.href.split("/")[3]
  // let destinationVal=window.location.href.split("/")[4]
  const dispatch = useDispatch();
  // const query = useQuery();
  // let originVal = query?.get("origin");
  // let destinationVal = query?.get("destination");
  // let categoryVal = query?.get("category");

  let categoriesData = convertor(DROPDOWN_OBJ);
  const { tab } = useSelector((state) => state.store || 0);

  const handleTabValueChange = (e, newValue) => {
    dispatch(setTab(newValue));
  };

  React.useEffect(() => {
    function start() {
      if (tab === 0) {
        let url = "";
        if (origin && origin !== "") {
          url += `/${origin}`;
        }
        if (category && category !== "" && origin) {
          url += `/${category}`;
        }
        navigate(url);
      }
      if (tab === 1) {
        let url = "";
        if (origin && origin !== "") {
          url += `/${origin}`;
        }
        if (origin && origin !== "" && destination && destination !== "") {
          url += `:${destination}`;
        }
        if (category && category !== "" && origin) {
          url += `/${category}`;
        }
        navigate(url);
      }
    }
    start();
  }, [navigate, attractionData, tripsData, category]);

  React.useEffect(() => {
    if (originVal || destinationVal) {
      localStorage.removeItem("tab");
    }
    if (originVal && originVal !== "" && originVal !== undefined) {
      localStorage.removeItem("origin");
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
      dispatch(setCategory(categoryVal));

      let idObj = categoriesData.find((all) => all.label === categoryVal);

      if (idObj) {
        dispatch(setCategoryId(idObj.id));
      }
    }
  }, []);

  if (isLoaded) {
    return (
      <Box className="mainCout">
       
        <ToastContainer />
        <Header />
        <div className="layout">
          <Grid container className="mainhead">
            <Grid item xs={12}>
              <NavBar handleChange={handleTabValueChange} value={tab} />
            </Grid>

            <Grid item xs={12} md={6.8} className="TabsHead">
              <SideBar />
              {tab == 0 && (
                <Box>
                  <AttractionSection />
                </Box>
              )}
              {tab == 1 && (
                <Box>
                  <StopSearchField />
                  <Stops />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={5.2} className="mapHead">
              {tab === 0 ? <AttractionMap /> : <TripsMap />}
            </Grid>
          </Grid>
        </div>
      </Box>
    );
  }
  return <div>Map loading...</div>;
}
