import React, { useState } from "react";
import "./stop.css";
import { manageSpacing, splitAddress } from "../../helper";
import { WEATHER } from "../../Constant";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setCategoryId,
  setCurrentTripPlaceId,
} from "../../store/index";
// Components
// Mui imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Places from "../tripPlaces/Places";

// Images and Icons
import downIcon from "../../assets/arrowDown.svg";
import location from "../../assets/locationIcon.svg";
import compass from "../../assets/compassIcon.svg";
import hour from "../../assets/hourIcon.svg";
import axios from "axios";
import { useSelector } from "react-redux";

const SingleStop = ({ item, index }) => {
  const dispatch = useDispatch();
  const [selectedStop, setSelectedStop] = useState({});
  const [expanded, setExpanded] = React.useState();

  // The Single Route Data
  let [routeLoading, setRouteLoading] = React.useState(true);
  let [latitude, setLatitude] = React.useState();
  let [longitude, setLongitude] = React.useState();
  let [routeData, setRouteData] = React.useState([]);
  const origin = useSelector((state) => state.store.origin || undefined);
  const currentPlaceTripId = useSelector(
    (state) => state.store.currentPlaceTripId || undefined
  );
  const destination = useSelector(
    (state) => state.store.destination || undefined
  );
  const categoryId = useSelector(
    (state) => state.store.categoryId || undefined
  );
  const radius = useSelector((state) => state.store.radius || undefined);
  let limit = useSelector((state) => state.store.limit);

  React.useEffect(() => {
    if (latitude && longitude) {
      let start = async () => {
        setRouteLoading(true);
        let url =
          `https://tripidoserver.herokuapp.com/trip/` +
          "places/" +
          latitude +
          "/" +
          longitude +
          `?limit=${limit}`;
        if (radius) {
          url += `&radius=${radius}`;
        }
        if (categoryId) {
          url += `&categories=${categoryId?.toString()}`;
        }

        url = url.replaceAll(" ", "");
        let { data } = await axios.get(url);
        // data = data.sort((a, b) => a?.photos.length - b?.photos.length);
        data = data?.sort(function (a, b) {
          return parseFloat(a?.distance) - parseFloat(b?.distance);
        });
        setRouteData(data);
        setRouteLoading(false);
      };
      start();
    }
  }, [latitude, longitude, categoryId, radius, limit]);

  React.useEffect(() => {
    setExpanded();
    setLatitude();
    setLongitude();
    setRouteData([]);
    setSelectedStop({});
  }, [origin, destination]);

  const onStop = (item, index, latitude, longitude) => {
    setSelectedStop(undefined);

    setExpanded(expanded === index ? 100 : index);
    setSelectedStop(item);

    // The Single Route Data
    setLatitude(latitude);
    setLongitude(longitude);
  };

  let currentPlace = React.useRef(null);

  React.useEffect(() => {
    if (currentPlaceTripId === item?.key) {
      currentPlace?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPlaceTripId]);
  return (
    <div key={index} ref={currentPlace}>
      <Accordion
        defaultExpanded="true"
        expanded={index === expanded}
        onMouseEnter={() => dispatch(setCurrentTripPlaceId(item?.key))}
      >
        <AccordionSummary
          onClick={() => onStop(item, index, item?.latitude, item?.longitude)}
          expandIcon={<img src={downIcon} className="downIcon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className="locationDetails">
            <img className="locationIcon" src={location} alt="" />
            <div>
              {splitAddress(item?.address).map((el, index) => {
                return index === 0 ? (
                  <Box className="LocationName">
                    <Typography variant="h5" className="cityName" title={el}>
                      {el}
                    </Typography>
                    {item?.weather && item?.weather?.iconText ? (
                      <Box>
                        <img
                          src={
                            WEATHER.find(
                              (i) => i?.name === item?.weather?.iconText
                            )?.icon
                          }
                          alt=""
                        />
                        <span>{item?.weather?.temp}</span>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                ) : index === 1 ? (
                  <Typography className="subHeading1">{el}</Typography>
                ) : (
                  <Typography className="subHeading2">{el}</Typography>
                );
              })}
            </div>
          </Box>

          <Box className="traveled">
            <Typography variant="subtitle1">Traveled so far</Typography>
            <Box className="traveledMain">
              <Box className="traveledInner">
                <img src={compass} alt="Travel" />
                <Typography variant="body2">
                  {manageSpacing(item?.distance_so_far)}
                </Typography>
              </Box>
              <Box className="traveledInner">
                <img src={hour} alt="" />
                <Typography variant="body2">
                  {manageSpacing(item?.travel_time_so_far)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails key={1} className="accDetails">
          <div>
            {routeLoading ? (
              <CircularProgress />
            ) : (
              !!Object.keys(selectedStop).length &&
              selectedStop?.key === item?.key && (
                <Places routeData={routeData} loading={routeLoading}></Places>
              )
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SingleStop;
