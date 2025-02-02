"use client";
import React, { useRef } from "react";
import PicturesList from "../PicturesList";
import shareIcon from "../../../public/assets/share.png";
import link from "../../../public/assets/link.png";
import { styled } from "@mui/material/styles";
import { CgMoreR } from "react-icons/cg";
import Link from "next/link";
import ReviewModel from "./ReviewModel";
import CircularProgress from "@mui/material/CircularProgress";
import { setCurrentPlaceId } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import Model from "./SeeMoreModel";
import Image from "next/image";

import { Grid } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Zoom } from "@mui/material";

import axios from "axios";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    maxWidth: 220,
    border: "1px solid #dadde9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Place = (prop) => {
  let dispatch = useDispatch();
  const currentPlaceId = useSelector(
    (state) => state.store.currentPlaceId || ""
  );
  let [openModel, setOpenModel] = React.useState(false);
  let [loading, setLoading] = React.useState(true);
  let [placeInfo, setplaceInfo] = React.useState({});
  let [hotelLoading, setHotelLoading] = React.useState(false);

  const showToastMessage = () => {
    toast.success("Address Is Added To The ClipBoard", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigator.clipboard.writeText(
      `${prop?.selectedPlace["name"]} ${prop?.selectedPlace["address"]}`
    );
    setTimeout(() => {
      toast.dismiss();
    }, 1500);
  };

  let activePlace = useRef();

  const onHoverAttraction = (id) => {
    dispatch(setCurrentPlaceId(id));
  };

  function share() {
    let url = decodeURI(window.location.href);
    toast.success(`${url.slice(0, 40)}... is added to the clipboard`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      toast.dismiss();
    }, 1500);
  }

  const handleSeeMore = async () => {
    setLoading(true);
    setOpenModel(true);
    let { data } = await axios.get(
      `https://tripidoserver.herokuapp.com/trip/placeDetails/${prop.selectedPlace.id}`
    );
    setLoading(false);
    setplaceInfo(data);
  };

  React.useEffect(() => {
    if (currentPlaceId === prop.selectedPlace.id) {
      activePlace?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPlaceId]);

  return (
    <div
      className="place"
      onMouseEnter={() => onHoverAttraction(prop?.selectedPlace?.id)}
      ref={activePlace}
    >
      <div className="placeMainFlex">
        <Grid item xs={12}>
          <div style={{ width: "100%" }}>
            {prop.selectedPlace["photos"] ? (
              <PicturesList selectedPlace={prop?.selectedPlace}></PicturesList>
            ) : (
              <div>{prop?.selectedPlace["name"]}</div>
            )}
          </div>
        </Grid>

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
              href={`//www.google.com/search?q=${prop?.selectedPlace?.name}${prop?.selectedPlace?.address}`}
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
                  marginTop: "20px",
                }}
              >
                <div className="ratingHead">
                  <HtmlTooltip
                    TransitionComponent={Zoom}
                    placement="top"
                    title={
                      <React.Fragment>
                        <p className="totalReviews">
                          {" "}
                          {prop?.selectedPlace["address"]}
                        </p>
                      </React.Fragment>
                    }
                  >
                    <Button className="ratingBtn">
                      <p className="totalReviews">
                        {prop?.selectedPlace["address"].slice(0, 12)}...
                      </p>
                    </Button>
                  </HtmlTooltip>
                </div>

                <HtmlTooltip
                  TransitionComponent={Zoom}
                  placement="top"
                  title={
                    <React.Fragment>
                      <p className="totalReviews">Copy Address</p>
                    </React.Fragment>
                  }
                >
                  <Image
                    src={link}
                    onClick={showToastMessage}
                    style={{ cursor: "pointer", height: "20px" }}
                    height={20}
                    width={20}
                    alt="img"
                  />
                </HtmlTooltip>

                <HtmlTooltip
                  TransitionComponent={Zoom}
                  placement="top"
                  title={
                    <React.Fragment>
                      <p className="totalReviews">More Info</p>
                    </React.Fragment>
                  }
                >
                  <h1 style={{ display: "none" }}>see more</h1>
                  <CgMoreR
                    className="seeMoreIcon"
                    onClick={handleSeeMore}
                    style={{ marginTop: "5px" }}
                  />
                </HtmlTooltip>

                <HtmlTooltip
                  TransitionComponent={Zoom}
                  placement="top"
                  title={
                    <React.Fragment>
                      <p className="totalReviews">Share</p>
                    </React.Fragment>
                  }
                >
                  <Image
                    src={shareIcon}
                    onClick={share}
                    style={{ cursor: "pointer", height: "20px" }}
                    height={20}
                    width={20}
                    alt="img"
                  />
                </HtmlTooltip>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ReviewModel place={prop?.selectedPlace} />
                <div className="distanceWrapper">
                  <p>{(prop?.selectedPlace?.distance / 1000).toFixed(1)}</p>
                  <p>km</p>
                  <p>away</p>
                </div>
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
        placeInfo={placeInfo}
      />
    </div>
  );
};

export default Place;
