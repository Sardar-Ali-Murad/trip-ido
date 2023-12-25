"use client";

import React, { useState } from "react";
import "./index.css";
import barIcon from "../../../public/assets/side1.svg";
import museumIcon from "../../../public/assets/side2.svg";
import parksIcon from "../../../public/assets/side3.svg";
import mall from "../../../public/assets/side4.svg";
import { setCategoryId, setCategory } from "../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";

const SideBar = () => {
  let dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(null);
  const category = useSelector((state) => state.store.category || undefined);
  const id = useSelector((state) => state.store.categoryId || undefined);

  function handleMalls() {
    setActive(true);
    setKey("bars");

    dispatch(setCategory("Retail, Shopping Mall"));
    dispatch(setCategoryId(17114));
  }

  function handleHotels() {
    setActive(true);
    setKey("Hotels");

    dispatch(setCategory("Dining and Drinking, Restaurant"));
    dispatch(setCategoryId(13065));
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
            onClick={handleMalls}
            className={
              category == "Retail, Shopping Mall" && active ? "activeBox" : ""
            }
          >
            {/* <img
              id="theatre-icon"
              className={
                category == "Retail, Shopping Mall" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={mall}
              alt="theatreIcon"
            /> */}
            <Image
              id="theatre-icon"
              className={
                category == "Retail, Shopping Mall" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={mall}
              alt="theatreIcon"
              height={60}
              width={60}
            />
            <span
              id="thatres"
              className={
                category == "Retail, Shopping Mall" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
            >
              Mall
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
            {/* <img
              id="museum-icon"
              className={
                category == "Arts and Entertainment, Museum" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={museumIcon}
              alt="museumIcon"
            /> */}
            <Image
              id="museum-icon"
              className={
                category == "Arts and Entertainment, Museum" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={museumIcon}
              alt="museumIcon"
              height={60}
              width={60}
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
            {/* <img
              id="parks-icon"
              className={
                category == "Landmarks and Outdoors, Park" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={parksIcon}
              alt="parksIcon"
            /> */}
            <Image
              id="parks-icon"
              className={
                category == "Landmarks and Outdoors, Park" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={parksIcon}
              alt="parksIcon"
              height={60}
              width={60}
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
            onClick={handleHotels}
            className={
              category == "Dining and Drinking, Restaurant" && active
                ? "activeBox"
                : ""
            }
          >
            {/* <img
              id="bar-icon"
              className={
                category == "Dining and Drinking, Restaurant" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={barIcon}
              alt="barIcon"
            /> */}
            <Image
              id="bar-icon"
              className={
                category == "Dining and Drinking, Restaurant" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
              src={barIcon}
              alt="barIcon"
              height={60}
              width={60}
            />
            <span
              id="bars"
              className={
                category == "Dining and Drinking, Restaurant" && active
                  ? "colorActive"
                  : "colorNonActive"
              }
            >
              Restaurant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
