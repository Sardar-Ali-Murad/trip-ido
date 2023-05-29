// The New
import React from "react";
import PicturesList from "../PicturesList";

import { Link } from "react-router-dom";

import AppConst from "../../AppConst";
import HotelModel from "./HotelModel";
import ReviewModel from "./ReviewModel";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import shareIcon from "../../assets/share.png";
import link from "../../assets/link.png";
import hotel from "../../assets/hotel.png";
import distance from "../../assets/distance.png";

// or
// Mui imports

import { Grid } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Place = (prop) => {
  let [hotels, setHotels] = React.useState([]);
  let { origin, category, destination } = useSelector((state) => state.store);
  let [open, setOpen] = React.useState(false);

  let [hotelLoading, setHotelLoading] = React.useState(false);

  const showToastMessage = () => {
    toast.success("Address Is Added To The ClipBoard", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigator.clipboard.writeText(
      `${prop?.selectedPlace["name"]} ${prop?.selectedPlace["address"]}`
    );
  };

  const hotelHandler = React.useCallback(async () => {
    try {
      setHotelLoading(true);
      let url =
        AppConst.appBaseUrl +
        `hotels/${prop?.selectedPlace?.lat}/${prop?.selectedPlace?.lng}`;
      let { data } = await axios.get(url);
      setHotels(data);
      setOpen(true);
      setHotelLoading(false);
    } catch (error) {}
  }, []);

  function share() {
    if (!origin || !destination) {
      toast.error(`Please Provide both the origin and the destination!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (origin && destination) {
      let url = decodeURI(window.location.href);
      toast.success(`${url} is added to the clipboard`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="place">
      {open && (
        <HotelModel
          open={open}
          hotels={hotels}
          setOpen={setOpen}
          setHotels={setHotels}
          hotelLoading={hotelLoading}
        />
      )}
      <Grid container item xs={12}>
        <div
          className="placeMainFlex"
          style={{ width: "98%", marginBottom: "10px" }}
        >
          <Grid item xs={12}>
            {prop.selectedPlace["photos"] ? (
              <PicturesList selectedPlace={prop?.selectedPlace}></PicturesList>
            ) : (
              <div>{prop?.selectedPlace["name"]}</div>
            )}
            <ReviewModel place={prop?.selectedPlace} />
          </Grid>

          <Grid item xs={12}>
            <h2
              className="categoriesHeading"
              title={prop?.selectedPlace["categories"]}
            >
              {prop?.selectedPlace["categories"]}
            </h2>

            <Link
              target={"_blank"}
              to={`//www.google.com/search?q=${prop?.selectedPlace?.address}`}
              className="placeName"
            >
              {prop?.selectedPlace["name"]}
            </Link>

            <div>{hotelLoading && <CircularProgress color="success" />}</div>
            <div className="singlePlaceLinksGrid" style={{ width: "100%" }}>
              <div className="singlePlaceLinksFlexBox" onClick={hotelHandler}>
                <img src={hotel} alt="hotel" />
                <p>Hotel</p>
              </div>
              <div
                className="singlePlaceLinksFlexBox"
                onClick={showToastMessage}
              >
                <img src={link} alt="hotel" />
                <p> {prop?.selectedPlace["address"].slice(0, 10)}...</p>
              </div>
              <div className="singlePlaceLinksFlexBox" onClick={share}>
                <img src={shareIcon} alt="hotel" />
                <p>Share Place</p>
              </div>
              <div className="singlePlaceLinksFlexBox">
                <img src={distance} alt="hotel" />
                <p> ({(prop?.selectedPlace?.distance / 1000).toFixed(1)}km)</p>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Place;
