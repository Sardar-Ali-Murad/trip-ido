// If You Click the "Trip Link" then below the Orgin & Destination This is there where yo see the different STops between the Orgin and the Destination this component contains that information!

import React from "react";
import { useSelector, useDispatch } from "react-redux"; //useStore is also an option
import AppConst from "../../AppConst";
import Stop from "./Stop";
import { handleTripsData } from "../../store/index";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Helmet } from "react-helmet";

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
  }, []);

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
    <div>
      <Helmet>
        <title>{title}</title>
        <meta
          name={`${
            tripsData
              ? tripsData.join(" ")
              : "Welcome to our trip app! Discover a world of seamless travel experiences at your fingertips. Our app is designed to make your trip planning and exploration effortless and enjoyable. Browse through a wide range of destinations, find the best deals on flights and accommodations, and create personalized itineraries tailored to your preferences. With intuitive navigation and real-time updates, our trip app ensures you have access to the latest information, maps, and recommendations to enhance your journey. Whether you're a seasoned traveler or a first-time adventurer, our app is your trusted companion for unforgettable trips. Start exploring today and let our trip app be your gateway to unforgettable travel experiences"
          }`}
          content={`${
            tripsData
              ? tripsData.join(" ")
              : "Welcome to our trip app! Discover a world of seamless travel experiences at your fingertips. Our app is designed to make your trip planning and exploration effortless and enjoyable. Browse through a wide range of destinations, find the best deals on flights and accommodations, and create personalized itineraries tailored to your preferences. With intuitive navigation and real-time updates, our trip app ensures you have access to the latest information, maps, and recommendations to enhance your journey. Whether you're a seasoned traveler or a first-time adventurer, our app is your trusted companion for unforgettable trips. Start exploring today and let our trip app be your gateway to unforgettable travel experiences"
          }`}
        />
      </Helmet>
      {loading ? <CircularProgress /> : <Stop data={tripsData}></Stop>}
    </div>
  );
};

export default Stops;
