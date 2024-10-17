import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    caption_light: React.CSSProperties | any;
    subtitle1_sb: React.CSSProperties | any;
    footnote: React.CSSProperties | any;
    h6_sb: React.CSSProperties | any;
    button_sc: React.CSSProperties | any;
    blogs_heading: React.CSSProperties | any;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    caption_light?: React.CSSProperties;
    h6_sb?: React.CSSProperties | any;
    h7?: React.CSSProperties | any;
    h5_sb?: React.CSSProperties | any;
    button_sc?: React.CSSProperties | any;
    subtitle1_sb?: React.CSSProperties | any;
    footnote?: React.CSSProperties | any;
    blogs_heading?: React.CSSProperties | any;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption_light: true;
    button_sc: true;
    subtitle1_sb: true;
    h6_sb: true;
    footnote: true;
    h7: true;
    h5_sb: true;
    blogs_heading: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface SimplePaletteColorOptions {
    15?: string;
    25?: string;
    50?: string;
    100?: string;
    200?: string;
  }
}
export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B26",
      light: "#FF8951",
      contrastText: "#fff",
      "25": "#FFF7F2",
      "50": "#FFF0E9",
      "100": "#FFE1D4",
      "200": "#FFA67D",
    },
    secondary: {
      main: "#00509F",
      light: "#3373B2",
      "25": "#F2F6FA",
      "50": "#F2F6FA",
      "100": "#CCDCEC",
    },

    error: {
      main: "#CF3636",
      light: "#ECAFAF",
      "100": "#F5D7D7",
    },
    success: {
      main: "#2D8C37",
      light: "#ABD1AF",
      "100": "#D5E8D7",
      "50": "#e6f4eb",
    },

    grey: {
      500: "#333333",
      400: "#5B5B5B",
      300: "#848484",
      200: "#ADADAD",
      100: "#D6D6D6",
      50: "#EAEAEA",
      A100: "#F4F4F4",
      A200: "#eaf0f6",
      A400: "#F9F9F9",
    },
  },
  typography: {
    h1: {
      fontSize: "5.625rem",
      lineHeight: "0.8",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),

      "@media (max-width:120rem)": {
        fontSize: "4.5rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: "3.875rem",
      },
    },

    h2: {
      fontSize: "3.875rem",
      lineHeight: "1.08",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),

      "@media (max-width:120rem)": {
        fontSize: "3.25rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "2.625rem",
      lineHeight: "1.28",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),

      "@media (max-width:37.5rem)": {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "2rem",
      lineHeight: "1.4",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),

      "@media (max-width:120rem)": {
        fontSize: "1.5rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      lineHeight: "1.5",
      fontFamily: ["HankenGroteskRegular", "sans-serif"].join(","),
      "@media (max-width:120rem)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: "1.125rem",
      },
    },
    h5_sb: {
      fontSize: "1.5rem",
      lineHeight: "1.5",
      fontWeight: "normal",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),
      "@media (max-width:120rem)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: "1.125rem",
      },
    },
    h6_sb: {
      fontSize: "1.375rem",
      lineHeight: "1.5",
      fontWeight: "normal",

      fontFamily: ["HankenGroteskSemibold", "sans-serif"].join(","),
      "@media (max-width:120rem)": {
        fontSize: "1.125rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: ".875rem",
      },
    },
    h6: {
      fontSize: "1.375rem",
      lineHeight: "1.45",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),
      "@media (max-width:120rem)": {
        fontSize: "1.125rem",
      },
      "@media (max-width:37.5rem)": {
        fontSize: ".875rem",
      },
    },
    h7: {
      fontSize: "1.125rem",
      lineHeight: "1.33",
      fontWeight: "normal",

      fontFamily: ["HankenGroteskSemibold", "sans-serif"].join(","),
      // '@media (max-width:120rem)': {
      //   fontSize: '.875rem',
      // },
      "@media (max-width:37.5rem)": {
        fontSize: "1rem",
      },
    },
    subtitle1_sb: {
      fontSize: "1rem",
      lineHeight: "1.5",
      fontWeight: "normal",
      fontFamily: ["HankenGroteskSemibold", "sans-serif"].join(","),
      "@media (max-width:37.5rem)": {
        fontSize: ".875rem",
      },
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: "2",

      fontFamily: ["HankenGroteskRegular", "sans-serif"].join(","),
      // '@media (max-width:120rem)': {
      //   fontSize: '.875rem',
      // },
      "@media (max-width:37.5rem)": {
        fontSize: ".875rem",
      },
    },
    subtitle2: {
      fontSize: ".875rem",
      lineHeight: "1.57",
      fontFamily: ["HankenGroteskSemibold", "sans-serif"].join(","),
      // '@media (max-width:120rem)': {
      //   fontSize: '.75rem',
      // },
      "@media (max-width:37.5rem)": {
        fontSize: ".75rem",
      },
    },
    body1: {
      fontSize: ".875rem",
      lineHeight: "1.57",
      fontFamily: ["HankenGroteskRegular", "sans-serif"].join(","),
      // '@media (max-width:120rem)': {
      //   fontSize: '.75rem',
      // },
      "@media (max-width:37.5rem)": {
        fontSize: ".75rem",
      },
    },
    body2: {
      fontSize: ".875rem",
      lineHeight: "1.57",

      fontFamily: ["HankenGroteskSemibold", "sans-serif"].join(","),
      // '@media (max-width:120rem)': {
      //   fontSize: '.75rem',
      // },
      "@media (max-width:37.5rem)": {
        fontSize: ".75rem",
      },
    },
    caption: {
      fontSize: ".75rem",
      lineHeight: "1.5",
      // fontWeight: '300',
      fontFamily: ["HankenGroteskRegular", "sans-serif"].join(","),
    },
    footnote: {
      fontSize: ".625rem",
      lineHeight: "1.2",
      fontWeight: "normal",

      fontFamily: ["HankenGroteskRegular", "sans-serif"].join(","),
    },
    caption_light: {
      fontSize: ".75rem",
      lineHeight: "1.2",
      fontWeight: "normal",
      fontFamily: ["HankenGroteskLight", "sans-serif"].join(","),
    },
    button: {
      fontSize: ".875rem",
      lineHeight: "1.2",
      letterSpacing: "-0.011em",
      textTransform: "capitalize",
      borderRadius: ".1875rem",
      fontWeight: "normal",
      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),
      // '@media (max-width:120rem)': {
      //   fontSize: '.8125rem',
      // },
      "@media (max-width:37.5rem)": {
        fontSize: ".75rem",
      },
    },
    button_sc: {
      fontSize: ".875rem",
      fontWeight: "normal",
      lineHeight: "1.2",
      fontFamily: ["HankenGroteskRegular", "sans-serif"].join(","),
    },
    blogs_heading: {
      fontSize: "1.75rem",
      lineHeight: "1.6",
      fontWeight: "normal",

      fontFamily: ["HankenGroteskBold", "sans-serif"].join(","),
      "@media (max-width:37.5rem)": {
        fontSize: "1.5rem",
      },
    },
  },
  shape: {
    borderRadius: 3,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,

      md: 834,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h1",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          h6_sb: "h2",
          subtitle1: "p",
          subtitle2: "p",
          body1: "span",
          body2: "span",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".1875rem",
          height: "2.875rem",
          py: "1rem",
          "@media (max-width:120rem)": {
            height: "2.625rem",
            py: ".8rem",
          },
          "@media (max-width:37.5rem)": {
            height: "2.375rem",
            py: ".6rem",
          },
        },
        text: {
          backgroundColor: "#FFF8F4",
          ":hover": {
            backgroundColor: "#FFE1D4",
          },
        },
        containedPrimary: {
          ":hover": {
            backgroundColor: "#e66022",
          },
          boxShadow: "0rem .5rem .9375rem rgba(255, 108, 38, 0.2)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",

            "& fieldset": {
              borderColor: "#ADADAD",
              borderRadius: ".1875rem",
            },
            "&:hover fieldset": {
              borderColor: "#e66022",
            },
          },
        },
      },
    },

    // MuiSelect: {
    //   styleOverrides: {
    //     select: {
    //       '& .MuiSelect-select': {
    //         maxHeight: '2.875rem',
    //       },
    //     },
    //   },
    // },
  },
});

const { shadows } = theme;
shadows[1] = "0rem .5rem .9375rem rgba(255, 108, 38, 0.05)";
shadows[2] = "0rem 0rem 1.875rem rgba(43, 43, 43, 0.1)";

// theme.typography.subtitle1 = {
//   fontSize: '16px',

//   [theme.breakpoints.down('md')]: {
//     fontSize: '14px',
//   },
// };
