import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const BookingSearch = () => {
  let [place, setPlace] = React.useState("");

  const placeRef = useRef(null);

  function handlePlace(e) {
    setPlace(e.target.value);
  }

  function placeChanged() {
    setPlace(placeRef?.current?.value);
  }

  return (
    <div>
      <Autocomplete onPlaceChanged={placeChanged}>
        <input
          placeholder="Search For A Place"
          value={place}
          ref={placeRef}
          onChange={handlePlace}
          className="searchInputPlace"
        />
      </Autocomplete>
    </div>
  );
};

export default BookingSearch;
