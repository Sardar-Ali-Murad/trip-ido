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
import { CgMoreR } from "react-icons/cg";
import Model from "./SeeMoreModel";

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
  let [openModel, setOpenModel] = React.useState(false);

  let [loading, setLoading] = React.useState(true);
  let [website, setWebsite] = React.useState("");

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

  const handleSeeMore = async () => {
    setLoading(true);
    setOpenModel(true);
    let { data } = await axios.get(
      `https://tripidoserver.herokuapp.com/trip/placeDetails/${prop.selectedPlace.id}`
    );
    setLoading(false);
    setWebsite(data.website);
  };

  return (
    <div
      className="place"
      onMouseEnter={() => onHoverAttraction(prop?.selectedPlace?.id)}
    >
      <div className="placeMainFlex">
        {/*  */}
        <Grid item xs={12}>
          <div style={{ width: "100%" }}>
            {prop.selectedPlace["photos"] ? (
              <PicturesList selectedPlace={prop?.selectedPlace}></PicturesList>
            ) : (
              <div>{prop?.selectedPlace["name"]}</div>
            )}
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
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <p> {prop?.selectedPlace["address"].slice(0, 20)}...</p>
                <img
                  src={link}
                  alt="hotel"
                  onClick={showToastMessage}
                  style={{ cursor: "pointer", height: "20px" }}
                />
                <CgMoreR className="seeMoreIcon" onClick={handleSeeMore} />

                <img
                  src={shareIcon}
                  alt="hotel"
                  onClick={share}
                  style={{ cursor: "pointer", height: "20px" }}
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ReviewModel place={prop?.selectedPlace} />
                <p>({(prop?.selectedPlace?.distance / 1000).toFixed(1)}km)</p>
              </div>
            </div>
            <div>{hotelLoading && <CircularProgress color="success" />}</div>
          </div>
        </Grid>
      </div>
      <Model
        open={openModel}
        setOpen={setOpenModel}
        loading={loading}
        website={website}
      />
    </div>
  );
};

export default Place;
