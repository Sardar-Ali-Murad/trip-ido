"use client";

/* global google */
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPlaceId } from "../../store/index";
import "./SearchMaps.css";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const GoogleMapsContainer = () => {
  let dispatch = useDispatch();
  const attractions = useSelector((state) => state.store.attractionData);
  let { currentPlaceId, origin } = useSelector((state) => state.store);

  let [latitude, setLatitude] = useState(0);
  let [longitute, setLongitude] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [map, setMap] = useState(/**@type google.maps.Map */ (null));

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
