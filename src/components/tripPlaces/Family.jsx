import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Family = () => {
  let [adults, setAdults] = React.useState(0);
  let [children, setChildrens] = React.useState(0);
  let [room, setRooms] = React.useState(0);

  function adultsHandler(action) {
    if (action === "plus") {
      let num = adults + 1;
      if (num < 10) {
        setAdults((pre) => pre + 1);
      }
    }
    if (action === "minus") {
      let num = adults - 1;
      if (num > 0) {
        setAdults((pre) => pre - 1);
      }
    }
  }

  function roomHandler(action) {
    if (action === "plus") {
      let num = adults + 1;
      if (num < 10) {
        setRooms((pre) => pre + 1);
      }
    }
    if (action === "minus") {
      let num = adults - 1;
      if (num > 0) {
        setRooms((pre) => pre - 1);
      }
    }
  }

  function childrenHandler(action) {
    if (action === "plus") {
      let num = adults + 1;
      if (num < 10) {
        setChildrens((pre) => pre + 1);
      }
    }
    if (action === "minus") {
      let num = adults - 1;
      if (num > 0) {
        setChildrens((pre) => pre - 1);
      }
    }
  }

  return (
    <div className="fmailyBox">
      {/*  */}
      <div className="singleElementFamily">
        <p>Adults</p>
        <div className="familyControlBox">
          <AiOutlineMinus
            onClick={() => adultsHandler("minus")}
            className="minus"
          />
          <p>{adults}</p>
          <AiOutlinePlus
            onClick={() => adultsHandler("plus")}
            className="plus"
          />
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="singleElementFamily">
        <p>Childrens</p>
        <div className="familyControlBox">
          <AiOutlineMinus
            onClick={() => childrenHandler("minus")}
            className="minus"
          />
          <p>{children}</p>
          <AiOutlinePlus
            onClick={() => childrenHandler("plus")}
            className="plus"
          />
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="singleElementFamily">
        <p>Rooms</p>
        <div className="familyControlBox">
          <AiOutlineMinus
            onClick={() => roomHandler("minus")}
            className="minus"
          />
          <p>{room}</p>
          <AiOutlinePlus onClick={() => roomHandler("plus")} className="plus" />
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Family;
