"use client";
/* global google */
import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import "./SearchMaps.css";

import { useDispatch } from "react-redux";
import {
  setDirectionsResponse,
  setCurrentTripPlaceId,
} from "../../store/index";

const GoogleMapsContainer = () => {
  let dispatch = useDispatch();

  let { directionsResponse, tripsData } = useSelector((state) => state.store);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [map, setMap] = useState(/**@type google.maps.Map */ (null));

  const origin = useSelector((state) => state?.store?.origin);
  const destination = useSelector((state) => state?.store?.destination);
  const currentPlaceTripId = useSelector(
    (state) => state?.store?.currentPlaceTripId
  );

  const calculateRoute = async () => {
    let loc1 = null;
    let loc2 = null;
    loc1 = origin;
    loc2 = destination;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: loc1,
      destination: loc2,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    dispatch(setDirectionsResponse(results));
  };

  const onHoverAttraction = (marker) => {
    setSelectedMarker(marker);
    dispatch(setCurrentTripPlaceId(marker?.key));
  };

  const onInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const onMapClick = () => {
    setSelectedMarker(null);
  };

  React.useEffect(() => {
    calculateRoute();
  }, [origin, destination]);

  React.useEffect(() => {
    let currentActivePlace = tripsData.find(
      (place) => place.key === currentPlaceTripId
    );
    setSelectedMarker(currentActivePlace);
  }, [currentPlaceTripId]);

  return (
    <>
      <div className="googleMapMain">
        <div className="googleMapChild">
          <GoogleMap
            // center={center}
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
              // streetView: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {/* <Marker position={center} animation={Animation.Drop} /> */}
            {tripsData?.map((place) => {
              return (
                <Marker
                  position={{
                    lat: Number(place?.latitude),
                    lng: Number(place?.longitude),
                  }}
                  title={place?.address}
                  onMouseOver={() => onHoverAttraction(place)}
                  foces={true}
                />
              );
            })}

            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: Number(selectedMarker?.latitude),
                  lng: Number(selectedMarker?.longitude),
                }}
                onCloseClick={onInfoWindowClose}
                pixelOffset={{}}
              >
                <div className="googlePopup">
                  <p>{selectedMarker?.address}</p>
                  <h4>{selectedMarker?.distance}</h4>
                </div>
              </InfoWindow>
            )}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
        {/* <Button onClick={() => map.panTo(center)}></Button> */}
      </div>
    </>
  );
};

export default GoogleMapsContainer;
