import React from "react";
import "./places.css";
import { useSelector, useDispatch } from "react-redux"; //useStore is also an option
// components
import Place from "./Place";
// mui
import { Button, Grid } from "@mui/material";
import { changeLimit, changeIsSeeMore } from "../../store/index";

const Places = () => {
  let dispatch = useDispatch();
  let isSeeMore = useSelector((state) => state.store.isSeeMore);
  const attractions = useSelector((state) => state.store.attractionData);

  if (attractions.length <= 1) {
    return (
      <p className="roboto">
        Please Change the filters in category & radius & Origin to see better
        results!{" "}
      </p>
    );
  }

  const seeMore = () => {
    dispatch(changeIsSeeMore(false));
    dispatch(changeLimit(50));
  };
  const hide = () => {
    dispatch(changeIsSeeMore(true));
    dispatch(changeLimit(3));
  };

  return (
    <>
      <Grid
        container
        item
        xs={12}
        display="flex"
        justifyContent="flex-start"
        className="places"
      >
        <Grid item xs={12}>
          {attractions?.map((place) => {
            return <Place key={place["key"]} selectedPlace={place}></Place>;
          })}
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          {isSeeMore ? (
            <Button
              className="placeBtn"
              letiant="outlined"
              sx={{ margin: "0 10px 1rem 0" }}
              onClick={() => seeMore()}
            >
              See All
            </Button>
          ) : (
            <Button
              className="placeBtn"
              letiant="outlined"
              sx={{ margin: "0 10px 1rem 0" }}
              onClick={() => hide()}
            >
              Hide
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Places;
