import React, { ReactNode } from "react";
import {
  BoxProps,
  CircularProgressProps,
  TypographyProps,
} from "@mui/material";
import { ImageProps, StaticImageData } from "next/image";

export interface IFeatureProps {
  title: string;
  svg: ReactNode;
}
export interface IMotivationalComponentProps {
  title: string;
}
export interface ISlideProps {
  title: string;
  rank: number;
}

export interface IDropzone {
  keyName?: string;
  variant?: "small" | "big";
  name: string;
  handleChange: (...args: any) => any;
  type?: "Requried" | "Optional" | "Others" | "Default";
}

export interface titleType {
  title: string;
}

export interface ILabelinterface {
  children: string | React.ReactNode;
  htmlFor: string | undefined;
}

export interface TextFieldType {
  label: string | React.ReactElement;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  type: "select" | "input" | "date" | "number";
  disabled?: boolean;
  options?: {
    value: string;
    key: string;
  }[];
  labelTextColor?: string;
  name: string;
}

export interface SelectFieldType {
  label: string | React.ReactElement;
  placeholder?: string;
  options?: {
    value: string;
    key: string;
  }[];
  labelTextColor?: string;
  name: string;
  configFunction?: () => void;
}

export interface FormStepperProps {
  activeStep: number;
  completed: { [k: number]: boolean };
  steps: string[];
  handleStep: any;
  width: string;
}

export interface ITextProps extends TypographyProps {
  component?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "li";
}

export interface IProgressCardProps {
  title: string;
  index: number;
}

export interface ImageComponentProps extends ImageProps {
  src: string | StaticImageData;
  fallbackSrc?: string | StaticImageData;
}
export interface RootContainerProps extends BoxProps {
  children: React.ReactNode;
  component?: React.ElementType;
}

export interface ScoreGaugeProps extends CircularProgressProps {
  value: number;
  offsetColor?: "primary" | "grey";
  showValue?: boolean;
  color?: any;
  type?: "orange" | "blue";
  boxSize?: number;
  method?: string;
}
