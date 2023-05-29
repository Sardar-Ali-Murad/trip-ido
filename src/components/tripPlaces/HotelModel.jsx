import * as React from "react";
import "./places.css";
import { GiPathDistance } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import Booking from "./Booking";

import {
  Dialog,
  Slide,
  DialogContent,
  DialogTitle,
  Typography,
  Rating,
  Button,
  Zoom,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export default function BasicModal({ hotels, open, setOpen, setHotels }) {
  const handleClose = () => {
    setOpen(false);
    setHotels([]);
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      maxWidth: 220,
      border: "1px solid #dadde9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div style={{ width: "90%" }}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className={`reviewModel`}
        style={{
          display: !open ? "none" : "block",
          zIndex: "12000",
          width: "90%",
        }}
      >
        <Booking />
        <DialogTitle className="reviewModelTitle">
          Hotels Information
        </DialogTitle>
        {hotels.length <= 0 && (
          <p style={{ fontFamily: "Roboto', sans-serif", margin: "0px 10px" }}>
            Sorry! We have no hotels Info in this place area
          </p>
        )}
        <DialogContent
          sx={{ maxHeight: "100%" }}
          className="reviewModelContent"
        >
          {hotels?.map((hotel) => {
            return (
              <div className="singleHotel">
                <img src={hotel?.imageUrl} />
                <h3>{hotel?.hotelName}</h3>
                <div className="hotelHotelsFlex">
                  <GiPathDistance />
                  <p>{hotel?.distance}km</p>
                </div>
                <div className="hotelHotelsFlex">
                  <CiLocationOn />
                  <p>{hotel?.hotelAddress}</p>
                </div>
                <div className="ratingHead">
                  <HtmlTooltip
                    TransitionComponent={Zoom}
                    placement="top"
                    title={
                      <React.Fragment>
                        <Typography
                          variant="h4"
                          className="ratingTooltip"
                          precision={0.1}
                        >
                          {hotel?.reviewScore / 2}
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <Button className="ratingBtn">
                      <Rating
                        name="read-only"
                        value={hotel?.reviewScore / 2}
                        precision={0.1}
                        sx={{ marginTop: "10px" }}
                        readOnly
                      />
                    </Button>
                  </HtmlTooltip>
                </div>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}
