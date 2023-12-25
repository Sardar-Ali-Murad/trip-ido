// The Pictures Grid in the atttraction and the trip data is dispalyed using this component!

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./PictureGrid.css";
import Image from "next/image";

export default function PicturesList(prop) {
  let photos = prop.selectedPlace["photos"];

  const showToastMessage = () => {
    window.open(
      `https://maps.google.com/maps?q=${prop?.selectedPlace?.name} ${prop?.selectedPlace?.address}`
    );
  };

  return (
    <ImageList>
      <ImageListItem key="Subheader" cols={2}></ImageListItem>
      {photos.length === 0 ? (
        <p className="photosErr">No Photos to Show</p>
      ) : (
        photos.map((item) => (
          <ImageListItem
            key={item}
            className="singlePictureGrid"
            style={{ width: "100%" }}
          >
            <div className="imageWrapper" style={{ width: "100%" }}>
              <Image
                src={`${item}?w=248&fit=crop&auto=format`}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  objectFit: "contain",
                }}
                onClick={showToastMessage}
                className="singleImg imgPlaces gridPlaceImg"
                height={100}
                width={100}
              />
            </div>
          </ImageListItem>
        ))
      )}
    </ImageList>
  );
}
