import {
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiButtonBase-root.MuiRadio-root.Mui-checked {
    color: ${({ theme, className }) =>
      className === "nuaa" ? "#00509F" : "primary"};
  }
  .MuiIconButton-root.MuiCheckbox-root.Mui-checked {
    color: ${({ theme, className }) =>
      className === "nuaa" ? "#00509F" : "primary"};
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  .MuiButtonBase-root.MuiCheckbox-root.Mui-checked,
  .MuiButtonBase-root.MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${({ theme, className }) =>
      className === "nuaa" ? "#00509F" : "primary"};
  }
`;
const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root fieldset {
    border-radius: 8px;
  }
  label.Mui-focused {
    color: ${({ theme, className }) =>
      className === "nuaa" ? "#00509F" : "primary"};
  }
  .MuiInput-underline:after {
    border-bottom-color: ${({ theme, className }) =>
      className === "nuaa" ? "#00509F" : "primary"};
  }
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: ${({ theme, className }) =>
        className === "nuaa" ? "#00509F" : "primary"};
    }
    &.Mui-focused fieldset {
      border-color: ${({ theme, className }) =>
        className === "nuaa" ? "#00509F" : "primary"};
    }
  }
`;

export const TextFieldWrapper = styled(
  StyledTextField,
  {},
)(({ theme }) => ({
  width: "100%",
  height: "100%",

  "& .MuiOutlinedInput-root": {
    height: "3.2rem",
    borderRadius: "8px",
    border: "black",
    backgroundColor: "#FFFFFF",
  },
}));

export const TextFieldWrapperPartner = styled(
  StyledTextField,
  {},
)(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& .MuiOutlinedInput-root": {
    height: "105px",
    borderRadius: "8px",
    alignItems: "flex-end",
    border: "black",
    backgroundColor: "#FFFFFF",
    "& input": {
      height: "100% !important",
    },
  },
}));

export const OutlinedInputWrapper = styled(
  OutlinedInput,
  {},
)(({ theme }) => ({
  minHeight: "2.875rem",
  maxWidth: "100%",
  width: "100%",
  height: "100%",
  borderRadius: "8px",

  "& .MuiOutlinedInput-input": {
    padding: ".75rem 1.5rem",
  },
}));
