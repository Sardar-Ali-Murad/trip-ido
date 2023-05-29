import React from "react";
import Home from "./page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  let { origin, destination, tab } = useSelector((state) => state.store);

  React.useEffect(() => {
    localStorage.setItem("origin", JSON.stringify(origin));
  }, [origin]);

  React.useEffect(() => {
    localStorage.setItem("destination", JSON.stringify(destination));
  }, [destination]);

  React.useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(tab));
  }, [tab]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
