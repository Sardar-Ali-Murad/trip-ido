// The New
import React, { useRef } from "react";
import PicturesList from "../PicturesList";
import shareIcon from "../../assets/share.png";
import link from "../../assets/link.png";
import hotel from "../../assets/hotel.png";
import distance from "../../assets/distance.png";

import { Link } from "react-router-dom";

import AppConst from "../../AppConst";
import HotelModel from "./HotelModel";
import ReviewModel from "./ReviewModel";
import CircularProgress from "@mui/material/CircularProgress";
import { setCurrentPlaceId } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Place = (prop) => {
  let dispatch = useDispatch();
  let [hotels, setHotels] = React.useState([]);
  let [open, setOpen] = React.useState(false);
  const currentPlaceId = useSelector(
    (state) => state.store.currentPlaceId || ""
  );

  let [hotelLoading, setHotelLoading] = React.useState(false);

  const showToastMessage = () => {
    toast.success("Address Is Added To The ClipBoard", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigator.clipboard.writeText(
      `${prop?.selectedPlace["name"]} ${prop?.selectedPlace["address"]}`
    );
  };

  let activePlace = useRef();

  React.useEffect(() => {
    if (currentPlaceId === prop.selectedPlace.id) {
      activePlace?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPlaceId]);

  const hotelHandler = React.useCallback(async () => {
    try {
      setHotelLoading(true);
      let url =
        AppConst.appBaseUrl +
        `hotels/${prop.selectedPlace.lat}/${prop.selectedPlace.lng}`;
      let { data } = await axios.get(url);
      setHotels(data);
      setOpen(true);
      setHotelLoading(false);
    } catch (error) {}
  }, []);

  const onHoverAttraction = (id) => {
    dispatch(setCurrentPlaceId(id));
  };

  function share() {
    let url = decodeURI(window.location.href);
    toast.success(`${url} is added to the clipboard`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigator.clipboard.writeText(url);
  }

  return (
    // <div>

    <div
      className="place"
      onMouseEnter={() => onHoverAttraction(prop?.selectedPlace?.id)}
      ref={activePlace}
    >
      {open && (
        <HotelModel
          open={open}
          hotels={hotels}
          setOpen={setOpen}
          setHotels={setHotels}
          hotelLoading={hotelLoading}
        />
      )}
      {/* </div> */}
      <Grid container item xs={12}>
        <div className="placeMainFlex">
          {/*  */}
          <Grid item xs={12}>
            <div style={{ width: "100%" }}>
              {prop.selectedPlace["photos"] ? (
                <PicturesList
                  selectedPlace={prop?.selectedPlace}
                ></PicturesList>
              ) : (
                <div>{prop?.selectedPlace["name"]}</div>
              )}
              <ReviewModel place={prop?.selectedPlace} />
            </div>
          </Grid>

          {/*  */}

          {/*  */}
          <Grid item xs={12}>
            <div>
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
              <div className="singlePlaceLinksGrid">
                <div className="singlePlaceLinksFlexBox" onClick={hotelHandler}>
                  <img src={hotel} alt="hotel" className="smallImg" />
                  <p>Hotel</p>
                </div>
                <div
                  className="singlePlaceLinksFlexBox"
                  onClick={showToastMessage}
                >
                  <img src={link} alt="hotel" className="smallImg" />
                  <p> {prop?.selectedPlace["address"].slice(0, 10)}...</p>
                </div>
                <div className="singlePlaceLinksFlexBox" onClick={share}>
                  <img src={shareIcon} alt="hotel" className="smallImg" />
                  <p>Share Place</p>
                </div>
                <div className="singlePlaceLinksFlexBox">
                  <img src={distance} alt="hotel" className="smallImg" />
                  <p>
                    {" "}
                    ({(prop?.selectedPlace?.distance / 1000).toFixed(1)}km)
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Place;
