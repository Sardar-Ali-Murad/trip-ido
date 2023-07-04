// This is the side bar where we have thearetre,museum,parks,bar on the left hand side!

import React, { useState } from "react";
import "./index.css";
import barIcon from "../../assets/side1.svg";
import museumIcon from "../../assets/side2.svg";
import parksIcon from "../../assets/side3.svg";
import mall from "../../assets/side4.svg";
import { setCategoryId, setCategory } from "../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SideBar = () => {
  let dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(null);
  const category = useSelector((state) => state.store.category || undefined);
  const id = useSelector((state) => state.store.categoryId || undefined);

  console.log(category, id);

  function handleBars() {
    setActive(true);
    setKey("bars");

    dispatch(setCategory("Dining and Drinking, Bar, Beer Bar"));
    dispatch(setCategoryId(13006));
  }

  function handleHotels() {
    setActive(true);
    setKey("Hotels");

    // dispatch(setCategory("Travel and Transportation, Lodging, Hotel"));
    dispatch(setCategory("Dining and Drinking, Restaurant, Burger Joint"));
    dispatch(setCategoryId(13031));
    // dispatch(setCategoryId(19014));
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
    <div>
      <p>Select Category</p>
      <div className="cattegory">
        <div className="background-category">
          <div
            id="boxes"
            onClick={handleHotels}
            className={
              category == "Travel and Transportation, Lodging, Hotel" && active
                ? "activeBox"
                : ""
            }
          >
            <img
              id="theatre-icon"
              className={
                category == "Travel and Transportation, Lodging, Hotel" &&
                active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={mall}
              alt="theatreIcon"
            />
            <span
              id="thatres"
              className={
                category == "Travel and Transportation, Lodging, Hotel" &&
                active
                  ? "colorActive"
                  : "colorNonActive"
              }
            >
              Restaurants
            </span>
          </div>
          <div
            id="boxes"
            onClick={handleMuseums}
            className={
              category == "Arts and Entertainment, Museum" && active
                ? "activeBox"
                : ""
            }
          >
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
          <div
            id="boxes"
            onClick={handleParks}
            className={
              category == "Landmarks and Outdoors, Park" && active
                ? "activeBox"
                : ""
            }
          >
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
          <div
            id="boxes"
            onClick={handleBars}
            className={
              category == "Dining and Drinking, Bar, Beer Bar" && active
                ? "activeBox"
                : ""
            }
          >
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
    </div>
  );
};
export default SideBar;
