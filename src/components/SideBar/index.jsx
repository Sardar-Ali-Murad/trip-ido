// This is the side bar where we have thearetre,museum,parks,bar on the left hand side!

import React, { useState } from "react";
import "./index.css";
import barIcon from "../../assets/barIcon.svg";
import museumIcon from "../../assets/museumIcon.svg";
import parksIcon from "../../assets/parksIcon.svg";
import { setCategoryId, setCategory } from "../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import mall from "../../assets/mall.png";

const SideBar = () => {
  let dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(null);
  const category = useSelector((state) => state.store.category || undefined);

  function handleBars() {
    setActive(true);
    setKey("bars");

    dispatch(setCategory("Dining and Drinking, Bar, Beer Bar"));
    dispatch(setCategoryId(13006));
  }

  function handleHotels() {
    setActive(true);
    setKey("Hotels");

    dispatch(setCategory("Travel and Transportation, Lodging, Hotel"));
    dispatch(setCategoryId(19014));
  }

  function handleMuseums() {
    setActive(true);
    setKey("museums");

    dispatch(setCategory("Arts and Entertainment, Museum"));
    dispatch(setCategoryId(10027));
  }

  function handleParks() {
    setActive(true);
    setKey("parks");

    dispatch(setCategory("Landmarks and Outdoors, Park"));
    dispatch(setCategoryId(16032));
  }

  return (
    <div className="cattegory">
      <div className="background-category">
        <div id="boxes" onClick={handleHotels}>
          <img
            id="theatre-icon"
            className={
              category == "Travel and Transportation, Lodging, Hotel" && active
                ? "colorActive"
                : "colorNonActive"
            }
            src={mall}
            alt="theatreIcon"
          />
          <span
            id="thatres"
            className={
              category == "Travel and Transportation, Lodging, Hotel" && active
                ? "colorActive"
                : "colorNonActive"
            }
          >
            Restaurants
          </span>
        </div>
        <div id="boxes" onClick={handleMuseums}>
          <img
            id="museum-icon"
            className={
              category == "Arts and Entertainment, Museum" && active
                ? "colorActive"
                : "colorNonActive"
            }
            src={museumIcon}
            alt="museumIcon"
          />
          <span
            id="museums"
            className={
              category == "Arts and Entertainment, Museum" && active
                ? "colorActive"
                : "colorNonActive"
            }
          >
            Museums
          </span>
        </div>
        <div id="boxes" onClick={handleParks}>
          <img
            id="parks-icon"
            className={
              category == "Landmarks and Outdoors, Park" && active
                ? "colorActive"
                : "colorNonActive"
            }
            src={parksIcon}
            alt="parksIcon"
          />
          <span
            id="parks"
            className={
              category == "Landmarks and Outdoors, Park" && active
                ? "colorActive"
                : "colorNonActive"
            }
          >
            Parks
          </span>
        </div>
        <div id="boxes" onClick={handleBars}>
          <img
            id="bar-icon"
            className={
              category == "Dining and Drinking, Bar, Beer Bar" && active
                ? "colorActive"
                : "colorNonActive"
            }
            src={barIcon}
            alt="barIcon"
          />
          <span
            id="bars"
            className={
              category == "Dining and Drinking, Bar, Beer Bar" && active
                ? "colorActive"
                : "colorNonActive"
            }
          >
            Bars
          </span>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
