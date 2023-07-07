import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Model({ open, setOpen, loading, placeInfo }) {
  const handleClose = () => setOpen(false);
  function handleOpenWebsite() {
    if (placeInfo?.website) {
      window.open(placeInfo?.website, "_blank");
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Click on see more button to access more information
          </Typography>
          {loading ? (
            <button className="seeMoreBtn">Loading...</button>
          ) : (
            <div className="seeMoreModelBtns">
              <button className="seeMoreBtn" onClick={handleOpenWebsite}>
                {placeInfo?.website
                  ? placeInfo?.website.slice(0, 20)
                  : "No Website To Show"}
              </button>
              <button className="seeMoreBtn">
                {placeInfo?.email
                  ? placeInfo?.email.slice(0, 20)
                  : "No Email To Show"}
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
