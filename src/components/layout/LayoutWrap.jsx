"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../../storeCenter/index";

const LayoutWrap = ({ children }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default LayoutWrap;
