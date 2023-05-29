// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import store from "./storeCenter/index";
// import { Provider } from "react-redux";
// import { HelmetProvider } from "react-helmet-async";

// import Config from "./components/config";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// const helmetContext = {};
// root.render(
//   <HelmetProvider context={helmetContext}>
//     <Provider store={store}>
//       <Config>
//         <App />
//       </Config>
//     </Provider>
//   </HelmetProvider>
// );

// reportWebVitals();

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
