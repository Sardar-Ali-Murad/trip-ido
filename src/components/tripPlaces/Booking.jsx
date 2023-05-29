import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { BsCalendarMonth } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoChevronUpSharp } from "react-icons/io5";
import BookingSearch from "./BookingSearch";
import CalenderSelect from "./Calender";
import Family from "./Family";

const Book = () => {
  let [search, setSearch] = React.useState(false);
  let [calender, setCalender] = React.useState(false);
  let [family, setFamily] = React.useState(false);

  function handleSearch() {
    setSearch((pre) => !pre);
    setCalender(false);
    setFamily(false);
  }

  function handleCalender() {
    setCalender((pre) => !pre);
    setSearch(false);
    setFamily(false);
  }

  function familyHandler() {
    setFamily((pre) => !pre);
    setCalender(false);
    setSearch(false);
  }

  return (
    <div className="bookingBigMain">
      <div className="bookingMain">
        <div className="bookingFlex" onClick={handleSearch}>
          <IoBedOutline className="bookIcon" />
          <p>Where are you going</p>
        </div>
        {search && <BookingSearch />}
        <div className="bookLine"></div>
        <div className="bookingFlex" onClick={handleCalender}>
          <BsCalendarMonth className="bookIcon" />
          <div className="bookSmallFlex">
            <p>Check-in Date</p>
            <p>____</p>
            <p>Check-out Date</p>
          </div>
        </div>
        {calender && <CalenderSelect />}

        <div className="bookLine"></div>
        <div className="bookingFlex" onClick={familyHandler}>
          <div className="bookSmallFlex">
            <MdFamilyRestroom className="bookIcon" />
            <p>2 adlts</p>
            <p>.</p>
            <p>2 children</p>
            <p>2 room</p>
          </div>
          <div>
            {family ? (
              <IoChevronDownSharp className="bookIcon" />
            ) : (
              <IoChevronUpSharp className="bookIcon" />
            )}
          </div>
        </div>

        {family && <Family />}
      </div>
      <button className="bookBtn">Search</button>
    </div>
  );
};

export default Book;
