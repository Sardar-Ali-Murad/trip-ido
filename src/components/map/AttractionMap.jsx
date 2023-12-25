"use client";

/* global google */
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"; //useStore is also an option
import "./SearchMaps.css";

import { setCurrentPlaceId } from "../../store/index";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const GoogleMapsContainer = () => {
  let dispatch = useDispatch();
  let [latitude, setLatitude] = React.useState(0);
  let [longitute, setLongitude] = React.useState(0);

  const [map, setMap] = useState(/**@type google.maps.Map */ (null));

  const origin = useSelector((state) => state.store.origin);
  const attractions = useSelector((state) => state.store.attractionData);
  const [selectedMarker, setSelectedMarker] = useState(null);

  let { currentPlaceId } = useSelector((state) => state.store);

  // ----------------
  const onMarkerClick = (marker, id) => {
    setSelectedMarker(marker);
    dispatch(setCurrentPlaceId(id));
  };

  function onHoverAttraction(id) {
    dispatch(setCurrentPlaceId(id));
  }

  const onInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const onMapClick = () => {
    setSelectedMarker(null);
  };

  React.useEffect(() => {
    let start = async () => {
      const results = await geocodeByAddress(origin);
      const latLng = await getLatLng(results[0]);
      setLatitude(latLng?.lat);
      setLongitude(latLng?.lng);
    };
    start();
  }, [attractions]);

  React.useEffect(() => {
    let currentMarker = attractions.find(
      (attraction) => attraction?.id === currentPlaceId
    );
    setSelectedMarker(currentMarker);
  }, [currentPlaceId]);

  const center = { lat: latitude, lng: longitute };

  return (
    <>
      <div className="googleMapMain">
        <div className="googleMapChild">
          <GoogleMap
            center={center}
            zoom={15}
            onClick={onMapClick}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              boxShadow: "0px 14px 47px rgba(91, 89, 89, 0.25)",
            }}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {attractions?.map((place) => {
              return (
                <Marker
                  position={{ lat: place?.lat, lng: place?.lng }}
                  onMouseOver={() => onHoverAttraction(place?.id)}
                  title={place?.name}
                  onClick={() => onMarkerClick(place, place?.id)}
                  foces={true}
                />
              );
            })}

            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: selectedMarker?.lat,
                  lng: selectedMarker?.lng,
                }}
                onCloseClick={onInfoWindowClose}
                pixelOffset={{}}
              >
                <div className="googlePopup">
                  <h4>{selectedMarker?.name}</h4>
                  <p>{selectedMarker?.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        <Button onClick={() => map?.panTo(center)}></Button>
        {/* . Map reset  */}
      </div>
    </>
  );
};

export default GoogleMapsContainer;
