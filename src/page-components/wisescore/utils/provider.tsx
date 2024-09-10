import {
  Box,
  Checkbox,
  Input,
  LinearProgress,
  linearProgressClasses,
  Slider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { IStyleInputProps, StyledCheckBoxProps } from "./type";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  lineHeight: "62.4px",
  letterSpacing: "-2%",
  fontFamily: "HankenGroteskExtraBold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
    lineHeight: "36.4px",
    letterSpacing: "-3%",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "28px",
    lineHeight: "36.4px",
    letterSpacing: "-3%",
  },
}));

export const StyledContainerWrapper = styled(Box, {
  name: "Layout-Wrapper",
})`
  margin: 0 auto;
  max-width: 1440px;
  padding: 0px 90px;

  ${(props) => props.theme.breakpoints.down("xl")} {
    padding: 0px 130px;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding: 0px 60px;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0px 0px;
  }
`;

export const SvgWrapper = styled(Box, {
  name: "Svg-Wrapper",
})`
  display: contents;
  ${(props) => props.theme.breakpoints.down("xl")} {
    display: none;
  }
`;

export const ScoreWrapper = styled(Box, {
  name: "Root-Layout-Wrapper",
})`
  margin: 0 auto;
  max-width: 1440px;
  padding: 0px 104px;

  ${(props) => props.theme.breakpoints.down("xl")} {
    padding: 0px 104px;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding: 10px 40px;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 10px 14px;
  }
`;

export const BorderLinearProgress = styled(LinearProgress)<{
  primaryColor: string;
  secondaryColor: string;
}>(({ primaryColor, secondaryColor }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: secondaryColor,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: primaryColor,
  },
}));

export const StyledBox = styled(Box)({
  /* Other styles for your component */

  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "your-color-here",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "your-color-here",
  },
});

export const StyledInputFiled = styled(TextField)`
  min-width: 100px;
  height: 60px;
  border-radius: 16px;
  max-width: 100px;
  border-bottom: none;
  &::before,
  &::after {
    display: none;
  }
  & input {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    outline: none;
    border: 1px solid #6c6c6c;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #323232;

    text-align: center;
    font-size: 20px;
    /* font-style: italic; */
    font-weight: 900;
    line-height: normal;
  }
  & .MuiOutlinedInput-root fieldset {
    border: none !important;
  }
  & input[type="number"]::-webkit-inner-spin-button,
  & input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

export const StyledSlider = styled(Slider)<StyledCheckBoxProps>(
  ({ theme, primaryColor }) => ({
    width: "100%",
    borderRadius: "16px",
    marginTop: "20px",

    "& .MuiSlider-rail": {
      height: "8px",
      borderRadius: "16px",
      backgroundColor: "#DCD1CC",
    },

    "& .MuiSlider-track": {
      height: "8px",
      borderRadius: "16px",
      backgroundColor: primaryColor,
    },

    "& .MuiSlider-thumb": {
      display: "block",
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: primaryColor,
      // marginTop: '-9px',
      // marginLeft: '-10px',
    },
  })
);

export const StyleInput = styled(Input)<IStyleInputProps>(
  ({ theme, secondaryColor }) => ({
    marginTop: "10px",
    // position: 'absolute',
    width: "100%",
    "& input": {
      backgroundColor: "#FCFAF8",
      padding: "18px 16px",
      borderRadius: "8px",
      border: "1px solid #3F3935",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: "800",

      // style placeholder
      "&::placeholder": {
        color: "#201C1A8C",
        fontWeight: "normal",
        fontSize: "14px",
      },
    },
    "&::after": {
      display: "none",
    },
    "&:hover:not(.Mui-disabled, .Mui-error):before": {
      borderBottom: "none",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "0",
      height: "0",
      borderLeft: "10px solid transparent", // Adjust the size of the triangle
      borderRight: "10px solid transparent", // Adjust the size of the triangle
      borderBottom: "10px solid #3F3935",
      top: "-8px",
      left: "40px", // Center the triangle horizontally
      transform: "translateX(-50%)", // Center the triangle horizontally
    },
  })
);

export const StyledCheckBox = styled(Checkbox)<StyledCheckBoxProps>(
  ({ primaryColor }) => ({
    color: "rgba(173, 173, 173, 1)",
    padding: "0px",
    // also give border
    "&.Mui-checked": {
      color: primaryColor,
    },
  })
);
