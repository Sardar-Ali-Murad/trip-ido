import React, { useState } from "react";
import "./stop.css";
import { manageSpacing, splitAddress } from "../../helper";
import { WEATHER } from "../../Constant";
import { useDispatch } from "react-redux";
import { setCurrentTripPlaceId } from "../../store/index";

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
import downIcon from "../../../public/assets/arrowDown.svg";
import location from "../../../public/assets/locationIcon.svg";
import compass from "../../../public/assets/compassIcon.svg";
import hour from "../../../public/assets/hourIcon.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";

const SingleStop = ({ item, index, expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const [selectedStop, setSelectedStop] = useState({});
  // const [expanded, setExpanded] = React.useState();

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
    setExpanded(expanded === index ? -1 : index);
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
    <div key={index} ref={currentPlace} style={{ overflowX: "hidden" }}>
      <Accordion
        defaultExpanded="true"
        expanded={index === expanded}
        onMouseEnter={() => dispatch(setCurrentTripPlaceId(item?.key))}
      >
        <AccordionSummary
          onClick={() => onStop(item, index, item?.latitude, item?.longitude)}
          expandIcon={
            <Image src={downIcon} className="downIcon" height={20} width={20} />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="singleStopWrapper">
            <div className="stopsAddressWrapper">
              <Image
                className="locationIcon"
                src={location}
                alt=""
                height={20}
                width={20}
              />
              <div className="stopAddressContent">
                {splitAddress(item?.address).map((el, index) => {
                  return index === 0 ? (
                    <Box className="LocationName">
                      <Typography variant="h7" className="cityName">
                        {el}
                      </Typography>
                      {item?.weather && item?.weather?.iconText ? (
                        <Box>
                          {/* <Image
                            src={
                              WEATHER.find(
                                (i) => i?.name === item?.weather?.iconText
                              )?.icon
                            }
                            alt=""
                            height={20}
                            width={20}
                          /> */}
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
            </div>

            <div className="addresDistance">
              <Typography>Traveled so far</Typography>
              <dic className="stopNumbers">
                <Box className="traveledInner">
                  <Image src={compass} alt="Travel" height={20} width={20} />
                  <Typography variant="body2">
                    {manageSpacing(item?.distance_so_far)}
                  </Typography>
                </Box>
                <Box className="traveledInner">
                  <Image src={hour} alt="" height={20} width={20} />
                  <Typography variant="body2">
                    {manageSpacing(item?.travel_time_so_far)}
                  </Typography>
                </Box>
              </dic>
            </div>
          </div>
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
      <div className="line" style={{ background: "rgb(255, 254, 254)" }}></div>
    </div>
  );
};

export default SingleStop;
