import { configureStore } from "@reduxjs/toolkit";

import appStore from "../store/index";

const mainStore = configureStore({
  reducer: {
    store: appStore,
  },
});

export default mainStore;
