// The New
// This is the Places Component Which is show in the left side when the tab is 0 and when you click the "attraction" Link
import React, { useState, useEffect } from "react";
import "./places.css";
import { formatDateForReadable } from "../../helper";
// components
// mui
import {
  Button,
  Dialog,
  Slide,
  Box,
  Typography,
  Zoom,
  Rating,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const ReviewModel = ({ place }) => {
  const [reviewModal, setReviewModal] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [rating, setRating] = React.useState([]);
  const handleClickReviewModal = (reviewsData = [], ratingData = []) => {
    if (reviewsData.length == 0) return;
    setReviews(reviewsData);
    setRating(ratingData);
    setReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModal(false);
  };
  return (
    <div>
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
                {place?.rating / 2}
              </Typography>
              {place?.reviews && (
                <h6 className="totalReviews">
                  <span>{place?.reviews?.length}</span> customer reviews
                </h6>
              )}
            </React.Fragment>
          }
        >
          <Button
            onClick={() =>
              handleClickReviewModal(place?.reviews, place?.rating)
            }
            className="ratingBtn"
          >
            <Rating
              name="read-only"
              value={place?.rating / 2}
              precision={0.1}
              sx={{ marginTop: "10px" }}
              readOnly
            />
          </Button>
        </HtmlTooltip>
      </div>
      <Dialog
        open={reviewModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseReviewModal}
        aria-describedby="alert-dialog-slide-description"
        className="reviewModel"
      >
        <DialogTitle className="reviewModelTitle">Customer Rating</DialogTitle>
        <DialogContent
          sx={{ maxHeight: "100%" }}
          className="reviewModelContent"
        >
          <Box className="totalReview">
            <Rating
              name="read-only"
              value={rating / 2}
              precision={0.1}
              readOnly
            />
            <p>{rating / 2} of 5</p>
          </Box>
          <p className="para">{reviews?.length} customers review</p>
          {reviews?.map((el, index) => {
            return (
              <Box key={index} className="reviewMHead">
                <p>{el?.text}</p>
                <span>{formatDateForReadable(el?.created_at)}</span>
              </Box>
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewModel;
