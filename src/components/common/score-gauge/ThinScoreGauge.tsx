"use client";
import { ScoreGaugeProps } from "@/types/other";
import {
  Box,
  CircularProgress,
  circularProgressClasses,
  Typography,
} from "@mui/material";

function ThinScoreGauge({
  value,
  // variant = 'orange',
  offsetColor = "primary",
  showValue = true,
  color = "primary.light",
  boxSize = 240,
  method,
  ...rest
}: ScoreGaugeProps) {
  const ringSize = 200;
  return (
    <Box
      alignItems={{
        lg: "center",
        md: "center",
        sm: "flex-start",
        xs: "flex-start",
      }}
      justifyContent={{
        lg: "center",
        md: "center",
        sm: "flex-start",
        xs: "flex-start",
      }}
      pr={{ xs: 3, lg: 0 }}
      sx={{
        position: "relative",
        display: {
          xs: "flex",
          sm: "flex",
          md: "inline-flex",
          lg: "inline-flex",
        },
        // flexDirection: 'row',

        flexBasis: "5.5rem",
        flexShrink: 0,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        thickness={2.2}
        size={boxSize}
        sx={{
          color: "#FF6B26",
          position: "absolute",
          zIndex: 10,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        {...rest}
      />
      <Box
        // bgcolor="red"
        sx={{
          ml: { lg: "0px", md: "0px", sm: "38px", xs: "38px" },
          mt: { lg: "0px", md: "0px", sm: "26px", xs: "26px" },
          position: "relative",
        }}
      >
        <Typography
          fontFamily="HankenGroteskSemiBold"
          letterSpacing="-1.1%"
          fontSize={{ lg: "96px", md: "96px", sm: "56px", xs: "56px" }}
          sx={{
            color: method === "nuaa" ? "#fff" : "#000",
          }}
          textAlign="center"
        >
          {showValue ? (value === 0 ? "" : `${Math.ceil(value)}`) : ""}
        </Typography>
      </Box>
      <CircularProgress
        variant="determinate"
        value={100}
        thickness={2.2}
        size={boxSize}
        sx={{
          color: "#FFD3B9",
          // opacity: '20%',
          position: "absolute",
          zIndex: 0,
        }}
      />
    </Box>
  );
}

export default ThinScoreGauge;
