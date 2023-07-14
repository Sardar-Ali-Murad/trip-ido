import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./storeCenter/index";
import { Provider } from "react-redux";

import Config from "./components/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Config>
      <App />
    </Config>
  </Provider>
);
