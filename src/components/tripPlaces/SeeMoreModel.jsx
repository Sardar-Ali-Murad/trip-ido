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

export default function Model({ open, setOpen, loading, website }) {
  const handleClose = () => setOpen(false);
  function handleOpenWebsite() {
    window.open(website, "_blank");
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
            <button className="seeMoreBtn" onClick={handleOpenWebsite}>
              See More
            </button>
          )}
        </Box>
      </Modal>
    </div>
  );
}
