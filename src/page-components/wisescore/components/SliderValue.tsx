"use client";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { Box, SliderProps } from "@mui/material";
import React, { useContext } from "react";
import { StyledInputFiled, StyledSlider } from "../utils/provider";

interface ISliderValueProps extends Omit<SliderProps, "value"> {
  value: string;
  onValueChange: (newValue: string) => void;
  min: number;
  max: number;
}

function SliderValue({
  value,
  onValueChange,
  min,
  max,
  ...rest
}: ISliderValueProps) {
  const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "") {
      onValueChange("");
      return;
    }
    if (
      Number(newValue) === 0 ||
      (Number(newValue) >= min && Number(newValue) <= max)
    ) {
      onValueChange(newValue);
    }
  };
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    onValueChange(String(newValue));
  };
  return (
    <Box
      width={{ lg: "60%", md: "60%", sm: "95%", xs: "95%" }}
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="60px"
    >
      <StyledInputFiled
        type="number"
        value={value}
        placeholder="0"
        name="sliderValue"
        id="sliderValue"
        onChange={handleInputChange}
      />
      <StyledSlider
        value={Number(value)}
        onChange={handleSliderChange}
        primaryColor={primaryColor}
        min={min}
        step={0.1}
        max={max}
        {...rest}
      />
    </Box>
  );
}

export default SliderValue;
