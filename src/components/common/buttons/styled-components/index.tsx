"use client";
import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";

export const CustomTooltip = styled(
  ({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "HankenGroteskRegular",
    lineHeight: "14.4px",
    padding: "10px 15px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000",
  },
});

export const CustomTypography = styled(Typography)({
  color: "#100f0ee4",
  fontSize: "14px",
  fontWeight: 400,
  fontFamily: "HankenGroteskRegular",
  lineHeight: "19.6px",
});
