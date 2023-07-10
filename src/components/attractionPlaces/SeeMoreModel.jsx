import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./places.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
const btnStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  background: "#e88b71",
  border: "2px solid #e88b71",
  height: "43px",
  borderRadius: "10px",
  cursor: "pointer",
  color: "#f1f1f1",
  fontSize: "20px",
  marginTop: "17px",
  alignItems: "center",
};

const close = {
  position: "absolute",
  top: "6px",
  right: "29px",
  fontSize: "29px",
  bottom: "10px",
  cursor: "pointer",
  color: "#e88b71",
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
          {loading ? (
            <button className="seeMoreBtn" style={btnStyle}>
              Loading...
            </button>
          ) : (
            <div
              className="seeMoreModelBtns"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button
                className="seeMoreBtn"
                onClick={handleOpenWebsite}
                style={btnStyle}
              >
                {placeInfo?.website
                  ? placeInfo?.website.slice(0, 20)
                  : "No Website To Show"}
              </button>
              <button className="seeMoreBtn" style={btnStyle}>
                {placeInfo?.email
                  ? placeInfo?.email.slice(0, 20)
                  : "No Email To Show"}
              </button>
            </div>
          )}
          <AiOutlineCloseCircle style={close} onClick={() => setOpen(false)} />
        </Box>
      </Modal>
    </div>
  );
}
