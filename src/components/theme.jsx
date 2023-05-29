import { createTheme } from "@mui/material";

const initialTheme = createTheme();

export const mainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          alignItems: "center",
          ".MuiTabs-flexContainer": {
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "0 auto",
            flexWrap: "wrap",
            [initialTheme.breakpoints.down("sm")]: {
              justifyContent: "space-around",
            },
          },
        },
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: "0",
          minHeight: "fit-content",
          margin: "0",
          color: "#000000",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "0.02em",
          textTransform: "capitalize",
          maxWidth: "unset",
          minWidth: "unset",
          [initialTheme.breakpoints.down("lg")]: {
            fontSize: "14px",
          },
          "&.Mui-selected": {
            borderBottom: "2px solid black",
            fontWeight: 700,
            color: "#000000",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          ".MuiFormControlLabel-label": {
            fontSize: "16px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputLabel-root": {
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "#E88B71",
          },
          ".MuiInputLabel-root.Mui-error": {
            color: "#E88B71",
            fontSize: "18px",
          },
          ".MuiInputLabel-root.Mui-focused": {
            color: "#E88B71",
            fontSize: "14px",
          },
          ".MuiInputLabel-root.MuiInputLabel-outlined": {
            color: "#E88B71",
            fontSize: "14px",
          },
          ".MuiOutlinedInput-notchedOutline": {
            outline: "none",
            border: "2px solid #E88B71 !important",
            borderColor: "#E88B71",
            borderRadius: "15px",
          },

          input: {
            border: "none",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#232323",
            [initialTheme.breakpoints.down("xl")]: {
              fontSize: "16px",
            },
            [initialTheme.breakpoints.down("lg")]: {
              fontSize: "12px",
            },
            [initialTheme.breakpoints.down(768)]: {
              fontSize: "18px",
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          marginBottom: "0 !important",
          border: "none",
          boxShadow: "unset",
          padding: "25px 0",
          borderBottom: "1px solid #EEEEEE",
          borderRadius: "unset",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0",
          border: "none",
          ".MuiAccordionSummary-content": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            [initialTheme.breakpoints.down(992)]: {
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            },
            [initialTheme.breakpoints.down(768)]: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            },
            [initialTheme.breakpoints.down(576)]: {
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            },
          },
          ".MuiAccordionSummary-expandIconWrapper": {
            marginLeft: 20,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "20px 0 0",
        },
      },
    },
  },
  typography: {
    h1: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 36,
      lineHeight: "45.6px",
      color: "#E88B71",
      [initialTheme.breakpoints.down(992)]: {
        fontSize: "28px",
        lineHeight: "34.6px",
      },
      [initialTheme.breakpoints.down(768)]: {
        fontSize: "26px",
        lineHeight: "26.7px",
        marginBottom: "10px",
      },
      [initialTheme.breakpoints.down(576)]: {
        fontSize: "20px",
        lineHeight: "24.7px",
      },
    },
    h3: {
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: "unset",
    },
    h4: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 20,
      lineHeight: "unset",
      color: "#E88B71",
    },
    h5: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 20,
      lineHeight: "unset",
      color: "#232323",
      letterSpacing: "0.02em",
      [initialTheme.breakpoints.down("xl")]: {
        fontSize: "18px",
      },
      [initialTheme.breakpoints.down("lg")]: {
        fontSize: "16px",
      },
    },
    body1: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 16,
      display: "inline-block",
      color: "#232323",
    },
    body2: {
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: 16,
      display: "inline-block",
      color: "#232323",
      [initialTheme.breakpoints.down("lg")]: {
        fontSize: "14px",
      },
    },
    body3: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "18px",
      [initialTheme.breakpoints.down(576)]: {
        fontSize: "12px",
        lineHeight: "12px",
      },
    },
    subtitle1: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 12,
      color: "#838383",
    },
    subtitle2: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 20,
      color: "#E88B71",
      lineHeight: "unset",
      [initialTheme.breakpoints.down(992)]: {
        fontSize: "16px",
        lineHeight: "20px",
      },
      [initialTheme.breakpoints.down(768)]: {
        fontSize: "16px",
      },
      [initialTheme.breakpoints.down(576)]: {
        fontSize: "14px",
        lineHeight: "13px",
      },
    },
  },
  palette: {},
});
