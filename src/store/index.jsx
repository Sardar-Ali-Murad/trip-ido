import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
const origin = getCookie("origin");
const destination = getCookie("destination");
const category = getCookie("category");

const initialState = {
  origin: origin || "Frankfurt, Germany",
  destination: destination || "Vienna, Austria",
  category: category || "Arts and Entertainment",
  radius: 10,
  tab: 0,
  attractionData: [],
  tripsData: [],
  categoryId: "",
  directionsResponse: "",
  loading: false,
  currentPlaceId: "",
  limit: 3,
  isSeeMore: true,
  placeChangedTrip: false,
  currentPlaceTripId: "",
};

const counterSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setOrigin(state, action) {
      state.origin = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setAttraction(state, action) {
      state.attraction = action.payload;
    },
    setDirectionsResponse: (state, action) => {
      state.directionsResponse = action.payload;
    },
    handleAttractionData(state, action) {
      state.attractionData = action.payload;
    },
    handleTripsData(state, action) {
      state.tripsData = action.payload;
    },

    setCategory(state, action) {
      state.category = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setRadius(state, action) {
      state.radius = action.payload;
    },
    setTab(state, action) {
      state.tab = action.payload;
    },
    showLoading: (state) => {
      state.loading = true;
    },
    removeLoading: (state) => {
      state.loading = false;
    },

    setCurrentPlaceId: (state, action) => {
      state.currentPlaceId = action.payload;
    },
    changeLimit: (state, action) => {
      state.limit = action.payload;
    },
    changeIsSeeMore: (state, action) => {
      state.isSeeMore = action.payload;
    },
    setChangePlaceTrip: (state) => {
      state.placeChangedTrip = !state.placeChangedTrip;
    },

    setCurrentTripPlaceId: (state, action) => {
      state.currentPlaceTripId = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setAttraction,
  handleAttractionData,
  setCategory,
  setRadius,
  setTab,
  setCategoryId,
  handleTripsData,
  setDirectionsResponse,
  showLoading,
  removeLoading,

  setCurrentPlaceId,
  changeLimit,
  changeIsSeeMore,
  setChangePlaceTrip,
  setCurrentTripPlaceId,
} = counterSlice.actions;

export default counterSlice.reducer;
