"use client";
import React, { useContext } from "react";
import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import WiseScoreDetailsContext from "@/context/wisescore-context";

interface FontStyleProps {
  weight?: TypographyProps["fontWeight"];
  size?: TypographyProps["fontSize"];
}

interface SelectButtonsProps extends BoxProps {
  text: string;
  Icon?: React.FC;
  fontExtend?: FontStyleProps;
  isActive?: boolean;
  disabled?: boolean;
  recommended?: boolean;
  variant?: "big" | "small";
}

function SelectButtons({
  text,
  Icon,
  fontExtend = {
    size: "24px",
    weight: 800,
  },
  isActive = false,
  disabled,
  recommended,
  variant,
  ...rest
}: SelectButtonsProps) {
  const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);

  const variants = {
    big: {
      padding: {
        lg: "26px 24px",
        md: "26px 24px",
        sm: "16px 24px",
        xs: "16px 24px",
      },
      width: {
        lg: "fit-content",
        md: "fit-content",
        sm: "100%",
        xs: "100%",
      },
      size: {
        lg: "20px",
        md: "20px",
        sm: "20px",
        xs: "20px",
      },
      minWidth: "248px",
    },
    small: {
      padding: {
        lg: "20px 24px",
        md: "20px 24px",
        sm: "16px 24px",
        xs: "16px 24px",
      },
      width: {
        lg: "fit-content",
        md: "fit-content",
        sm: "100%",
        xs: "100%",
      },
      size: {
        lg: "20px",
        md: "20px",
        sm: "20px",
        xs: "20px",
      },
      minWidth: "190px",
    },
  };

  const thisVariant = !variant
    ? variants.big
    : variant === "small"
    ? variants.small
    : variants.big;

  return !disabled ? (
    <Box
      display="flex"
      position="relative"
      justifyContent="center"
      alignItems="center"
      padding={thisVariant.padding}
      width={thisVariant.width}
      minWidth={thisVariant.minWidth}
      boxShadow={isActive ? "0px 8px 20px 0px rgba(0, 0, 0, 0.06)" : "0px"}
      border={`${isActive ? "2" : "1"}px solid ${
        isActive ? primaryColor : "#ADADAD"
      }`}
      bgcolor={isActive ? secondaryColor : "#ffffff"}
      borderRadius="8px"
      gap="16px"
      sx={{
        transition: "all .2s ease",
        cursor: "pointer",
        "&:hover": {
          borderColor: primaryColor,
          bgcolor: secondaryColor,
          transform: "scale(1.02)",
        },
      }}
      {...rest}
    >
      {Icon && <Icon />}
      <Typography fontFamily="HankenGroteskRegular" fontSize={thisVariant.size}>
        {text}
      </Typography>
      {recommended && (
        <Typography
          position="absolute"
          top={-15}
          borderRadius="70px"
          fontSize="14px"
          padding="4px 12px"
          bgcolor="#EAF3FF"
          color="#3185FC"
          display="inline-flex"
          alignItems="center"
          gap={0.5}
        >
          <Box
            width="8px"
            height="8px"
            border="1px solid #BCD8FF "
            bgcolor="#3185FC"
            borderRadius="50%"
          />
          Recommended
        </Typography>
      )}
    </Box>
  ) : (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={thisVariant.padding}
      width={thisVariant.width}
      minWidth={thisVariant.minWidth}
      border={`1px solid ${isActive ? "#FFB584" : "#B5B5B5"}`}
      bgcolor={isActive ? "#EFE5DA" : "#ffffff"}
      borderRadius="8px"
      gap="16px"
      sx={{
        cursor: "not-allowed",
      }}
      {...rest}
    >
      {Icon && <Icon />}
      <Typography
        fontFamily="HankenGroteskRegular"
        color="#ADADAD"
        fontSize={thisVariant.size}
      >
        {text}
      </Typography>
      <Typography
        position="absolute"
        top={-15}
        borderRadius="70px"
        fontSize="14px"
        padding="4px 12px"
        bgcolor="#DBDBDB"
        color="#3F3935"
      >
        Coming soon
      </Typography>
    </Box>
  );
}

export default SelectButtons;
