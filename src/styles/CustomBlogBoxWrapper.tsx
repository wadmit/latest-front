import { Box, styled } from "@mui/material";

export const CustomBlogBoxWrapper = styled(Box)(({ theme }) => ({
  "& img": {
    borderRadius: "8px",
    width: "100% !important",
    height: "100% !important",
    maxHeight: "423px !important",
    objectFit: "cover !important",
  },
  "& iframe": {
    borderRadius: "8px",
    width: "100% !important",
    height: "405px !important",
    // maxHeight: '423px !important',
    // objectFit: 'cover !important',
  },
  "& p": {
    textAlign: "left",
    marginBottom: "24px",
    fontfamily: "HankenGroteskRegular !important",
    lineHeight: "22.4px",
    fontSize: "16px",
  },
  "& p>a": {
    color: `${theme.palette.primary.main} !important`,
    textDecoration: "none !important",
    "&:hover": {
      textDecoration: "underline !important",
    },
  },
  "& h4": {
    fontSize: "24px",
    fontWeight: 800,
    fontfamily: "HankenGroteskExtraBold !important",
    marginBottom: "24px",
    marginTop: "24px",
    color: "#000000 !important",
  },
  "& h3": {
    fontSize: "1.3rem",
    fontWeight: 800,
    fontfamily: "HankenGroteskExtraBold !important",
    marginBottom: "24px",
    marginTop: "24px",
    color: "#5B5B5B !important",
  },
  "& ul": {
    listStyle: "none" /* Remove default bullets */,
    "& li::before": {
      content: '"."',
      fontSize: "2em",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
    "& li": {
      marginBottom: "10px",
    },
  },
  "& table": {
    width: "100%",
    borderRadius: "8px",
  },
  "& figure": {
    margin: "0",
    marginTop: "20px",
    width: "100%",
    marginBottom: "20px",
  },
  "& th": {
    padding: "12px",
    borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgb(225, 232, 237)",
    textAlign: "left",
  },
  "& table tbody tr td": {
    padding: "12px",
    border: "1px solid #fff", // Add border to separate columns
  },
  "& table tbody tr:nth-child(odd)": {
    backgroundColor: "rgb(248, 248, 248)",
  },
  "& table tbody tr td:nth-child(odd)": {
    padding: "12px",
  },
  "& table tbody tr:nth-child(even)": {
    backgroundColor: "rgb(225, 232, 237)",
    padding: "12px",
  },
  "& table tbody tr td:nth-child(even)": {
    padding: "12px",
  },
  "& .noteTitle": {
    fontWeight: "bold",
    fontStyle: "italic",
    color: "grey",
    marginRight: "5px",
  },
  "& #noteContent": {
    fontStyle: "italic",
    color: "grey",
  },
  "& #infoStyle": {
    backgroundColor: "rgba(234, 243, 255, 1)",
    padding: "24px 45px 24px 28px",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "20px",
    "& p": {
      margin: "0px !important",
      fontSize: "16px",
      fontStyle: "normal",
      fontFamily: "HankenGroteskRegular",
      lineHeight: "160%",
      letterSpacing: "0.1px",
    },
  },
}));
